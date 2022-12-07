
// TASK: https://adventofcode.com/2022/day/7

const fs = require('fs');


fs.readFile('input-7.txt', 'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }
    const d = data.split("$").map(x => x.split("\n"))
    d.shift()
    d.shift()

    const commands = d.map(x => {
        const command = x[0].trimStart()
        const result = x.slice(1)
        return { command, result }
    })

    // console.log(commands)

    let tree = {
       
    }

    let currentLevel = 0;
    d.forEach((line, index) => {
        if (line.includes("cd /")) {
            console.log("xxx", index)
        }
    })


    console.log(commands[3])
    //for ls
    // commands.forEach((cmd) => {
    //     if (cmd.command.includes(" ls")) {
    //         cmd.result.forEach(res => {
    //             if (res.includes("dir ")) {
    //                 const dir = res.split("dir ")[1]
    //                 tree[currentLevel] = {
    //                     ...tree[currentLevel],
    //                     [dir]: dir
    //                 }
    //             }
    //             if (!isNaN(res.split(" ")[0])) {
    //                 const fileSize = res.split(" ")[0]
    //                 const fileName = res.split(" ")[1]
    //                 tree[currentLevel] = {
    //                     ...tree[currentLevel],
    //                     [fileName]: +fileSize
    //                 }
    //             }
    //         })
    //     }
    // })

    let currentCat = "/"
    let prevCat = "/"

    for(let i = 0; i < 3; i++) {
        if (commands[i].command.includes(" ls")) {
            commands[i].result.forEach(res => {
                if (res.includes("dir ")) {
                    const dir = res.split("dir ")[1]
                    tree = {
                        ...tree,
                        [dir]: {
                            ...tree[dir],
                            [dir]: dir
                        }
                    }
                }
                if (!isNaN(res.split(" ")[0])) {
                    const fileSize = res.split(" ")[0]
                    const fileName = res.split(" ")[1]
                    tree = {
                        ...tree,
                        [currentCat]: {
                            ...tree[currentCat],
                            [fileName]: +fileSize
                        }
                    }
                   
                }
            })
        }

        // if(commands[i].command.includes("cd ")) {
        //     const dir = commands[i].command.split("")[1]
        //     console.log("dir", dir)
        //     prevCat = currentCat
        //     currentCat = dir
        // }

        console.log("i",i, tree)
    }


    console.log(tree)

});
