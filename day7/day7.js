
// TASK: https://adventofcode.com/2022/day/7

const fs = require('fs');

class ThreeNode {
    constructor() {
        this.parent = undefined;
        this.children = [];
        this.name = undefined;
        this.type = undefined;
        this.nodeSize = 0
    }
}

function calculateNodeSize(node) {
    if (node.type === "FILE") {
        return node.size;
    }

    if (node.type === "DIR") {
        let sum = 0;
        node.children.forEach(child => {
            sum += calculateNodeSize(child)
        })
        return sum;
    }
}

function calculateDir(root) {
    root.nodeSize = calculateNodeSize(root)
    // console.log(root.name, root.type, root.nodeSize)
    root.children.forEach(x => {
        if (x.type === "DIR") {
            calculateDir(x)
        }
    })
}

const lessThan100 = []

const allDirs = []

function findAllChildrenLessThan100000(node) {
    if (node.type === "DIR") {
        if (node.nodeSize < 100000) {
            // console.log(node.name, node.nodeSize)
            lessThan100.push(node.nodeSize)
        }
    }
    node.children.forEach(x => {
        if (x.type === "DIR") {
            findAllChildrenLessThan100000(x)
        }
    })
}

function findAllDirs(node) {
    if (node.type === "DIR") {
        allDirs.push(node)
    }
    node.children.forEach(x => {
        if (x.type === "DIR") {
            findAllDirs(x)
        }
    })
}



function getCommandType(command = '') {
    if (command.startsWith("cd ..")) {
        return "GO_UP"
    }
    if (command.startsWith("cd ")) {
        return "GO_TO_CAT"
    }
    if (command.startsWith("ls")) {
        return "LIST"
    }
}

function getResultType(result = '') {
    if (result.startsWith("dir")) {
        return {
            type: "DIR",
            name: result.split(" ")[1]
        }
    }

    if (!isNaN(parseInt(result.split(" ")[0]))) {
        return {
            type: "FILE",
            name: result.split(" ")[1],
            size: parseInt(result.split(" ")[0])
        }
    }
}


fs.readFile('input-7.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const d = data.split("$").map(x => x.split("\n"))
    d.shift()
    d.shift();

    const commands = d.map(x => {
        const command = x[0].trimStart()
        const result = x.slice(1).filter(x => x !== "");

        return { command, result }
    })

    const root = new ThreeNode()
    root.name = "/"

    let currentNode = root;

    commands.forEach(cmd => {
        const commandType = getCommandType(cmd.command)

        if (commandType === "GO_UP") {
            currentNode = currentNode.parent;
        }
        if (commandType === "GO_TO_CAT") {
            const dirName = cmd.command.split(" ")[1]
            const nextNode = currentNode.children.find(x => x.name === dirName)
            currentNode = nextNode;
        }

        if (commandType === "LIST") {
            // nothing to do
        }

        if (cmd.result.length) {
            cmd.result.forEach(r => {
                const resultType = getResultType(r)
                if (resultType.type === "DIR") {
                    const newDirNode = new ThreeNode()
                    newDirNode.parent = currentNode;
                    newDirNode.name = resultType.name;
                    newDirNode.type = "DIR"
                    currentNode.children.push(newDirNode)

                }

                if (resultType.type === 'FILE') {
                    const newFileNode = new ThreeNode()
                    newFileNode.parent = currentNode;
                    newFileNode.name = resultType.name;
                    newFileNode.size = resultType.size;
                    newFileNode.type = "FILE"
                    currentNode.children.push(resultType)
                }
            })
        }




    })

    calculateDir(root)

    // console.log(findAllChildrenLessThan100000(root))
    findAllChildrenLessThan100000(root)
    console.log("PART 1 ANSWER",lessThan100.reduce((a, b) => a + b, 0))


    let totalRootSum = 0;
    root.children.forEach(x => {

        if (x.type === "DIR") {
            // console.log(x.name, x.nodeSize)
            totalRootSum += x.nodeSize
        }
        if (x.type === "FILE") {
            // console.log(x.name, x.size)
            totalRootSum += x.size
        }

    })


    const totalSpace = 70000000;
    const needToHave = 30000000;

    const currentLeftSpace = totalSpace - totalRootSum;
    // console.log("currentLeftSpace", currentLeftSpace)

    const needToFree = needToHave - currentLeftSpace;
    // console.log("Need to free", needToFree)

    findAllDirs(root)
    const allDirsSizes = allDirs.map(x => x.nodeSize)
    allDirsSizes.sort((a, b) => a - b)
    const lessThanNeedToFree = allDirsSizes.filter(x => x <= needToFree)
    const biggerThanNeedToFree = allDirsSizes.filter(x => x >= needToFree)

    const diffFreeLess = needToFree - lessThanNeedToFree.at(-1)
    const diffFreeBigger = biggerThanNeedToFree.at(0) - needToFree
    

    if(diffFreeLess < diffFreeBigger) {
        console.log("PART TWO ANSWER",lessThanNeedToFree.at(-1))
    }
    else {
        console.log("PART TWO ANSWER",biggerThanNeedToFree.at(0))
    }
});
