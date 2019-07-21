const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const babel = require("@babel/core")

const moduleAnalyser = filename => {
  const content = fs.readFileSync(filename, 'utf-8')
  // console.log("源码" ,content)
  const ast = parser.parse(content, {
    sourceType: 'module'
  })
  // console.log('分析源代码--ast抽象语法树', ast.program.body)

  // 收集所有的依赖
  const dependencies = {}
  traverse(ast, {
    // 抽象语法树包含引入函数就会走下面的函数
    ImportDeclaration({ node }) {
      // console.log('node-->', node)
      const dirname = path.dirname(filename)
      // console.log('dirname--根文件的目录, dirname)
      // 将依赖的相对路径转换成绝对路径（或者相对bundler的路径）
      const newFile = './' + path.join(dirname, node.source.value)
      // console.log('newFile-->转换成绝对路径的依赖文件', newFile)
      // dependencies.push(node.source.value)
      dependencies[node.source.value] = newFile
    }
  })
  // console.log('文件中所有的依赖', dependencies)
  const { code } = babel.transformFromAst(ast, null, {
    presets: ['@babel/preset-env']
  }
    // , function (err, result) {
    //   // console.log('babel转换后的代码', result)
    //   const { code, map, ast } = result;
    // }
  )
  // console.log('转换过后的代码--code', code)
  return {
    // 入口文件
    filename,
    // 依赖
    dependencies,
    // babel转换过后的代码
    code
  }
}

// 依赖图谱存储所有依赖的信息
const makeDependenciesGraph = (entry) => {
  const entryModule = moduleAnalyser(entry)
  // console.log('entryModule--->', entryModule)
  const graphArray = [entryModule]
  for (let i = 0; i < graphArray.length; i++) {
    const item = graphArray[i]
    const { dependencies } = item
    if (dependencies) {
      //如果入口文件有依赖，就去循环依赖
      for (let j in dependencies) {
        graphArray.push(
          moduleAnalyser(dependencies[j])
        )
      }
    }
  }
  const graph = {}
  graphArray.forEach(item => {
    graph[item.filename] = {
      dependencies: item.dependencies,
      code: item.code
    }
  })
  // console.log('graphArray--所有的依赖数组', graphArray)
  return graph
}

const generateCode = (entry) => {
  // console.log('makeDependenciesGraph(entry)', makeDependenciesGraph(entry))
  console.log('entry--->', entry)
  const graph = JSON.stringify(makeDependenciesGraph(entry))
  return `
    (function(graph){
       function require(module){
         function localRequire(relativePath){
           // 根据依赖名字获取真实路径
           return require(graph[module].dependencies[relativePath])
         };
         var exports = {};
        (function (require, exports, code){ 
          eval(code)
        })(localRequire, exports, graph[module].code);
        return exports;
       };
       require('${entry}')
    })(${graph})
  `
}

const code = generateCode('./src/index.js')
console.log('code--->', code)
// const graghInfo = makeDependenciesGraph('./src/index.js')
// console.log('graghInfo-->', graghInfo)
// const moduleInfo = moduleAnalyser('./src/index.js')
// console.log('moduleInfo', moduleInfo)