class Keybind {
    key
    mean
    add_class = ""
    showIn
    showAlways = false
    action = () => {
        console.log("working!")
    }


    constructor({key,mean,color,action,showAlways}) {
        if(key.length > 1.2) {
            this.showIn = key.shift()
        } else {
            this.showIn = "MAIN"
        }

        if(showAlways) this.showAlways = true
        
        if(action) this.action = action
        this.key = key[0]
        this.mean = mean,
        this.add_class = color || ""
    }



    exec() {
        this.action()
    }
}

class Keybinds {
    keybinds = []
    length = 0

    constructor(listOfKeybinds) {
        this.keybinds = listOfKeybinds
        this.length = this.keybinds.length
    }

    at(index) {
        return this.keybinds[index]
    }
}

let keybinds = new Keybinds([
    new Keybind({
        key: ["."],
        mean: "go back",
        showAlways: true,
        action: "setpage;default",
        color:"green"
    }),
    new Keybind({
        key: ["e"],
        mean: "goto",
        color:"green"
    }),
    new Keybind({
        key: ["!","c"],
        mean: "close all",
        color:"green"
    }),
    new Keybind({
        key: ["s","d"],
        mean: "duckduckgo",        
        action: ({askThen}) => {
            askThen({
                prefix: "search with duckduckgo",
                doNext: (val) => { window.open("https://duckduckgo.com/?q="+encodeURIComponent(val)) }
            })
        },
        color:"purple"
    }),
    new Keybind({
        key: ["g"],
        mean: "github",
        action: "setpage",
        color:"orange"
    }),
    new Keybind({
        key: ["g", "e"],
        mean: "goto user / project",
        action: ({askThen}) => {
            askThen({
                prefix: "name/repo",
                doNext: (val) => { window.open("https://github.com/"+val) }
            })
        },
        color:"purple"
    }),
     new Keybind({
        key: ["t", "h"],
        mean: "check color",
        action: ({askThen}) => {
            askThen({
                prefix: "hex color",
                doNext: (val) => { window.open("https://coolors.co/"+val.replace("#","")) }
            })
        },
        color:"purple"
    }),
    new Keybind({
        key: ["t", "o"],
        mean: "check contrast",
        action: ({askThen}) => {
            askThen({
                prefix: "hex color",
                doNext: (val) => { window.open("https://coolors.co/contrast-checker/"+val.replace("#","")) }
            })
        },
        color:"purple"
    }),
    //#202e25
    new Keybind({
        key: ["g", "m"],
        mean: "miftikcz",
        action: "link;github.com/MiftikCZ",
    }),
    new Keybind({
        key: ["g", "x"],
        mean: "explore",
        action: "link;github.com/explore",
    }),
    new Keybind({
        key: ["g", "i"],
        mean: "issues",
    }),
    new Keybind({
        key: ["g", "p"],
        mean: "pull requests",
        action: "link;github.com/pulls",
    }),
    new Keybind({
        key: ["a"],
        mean: "apps",
        action: "setpage",
        color:"orange"
    }),
    new Keybind({
        key: ["t"],
        mean: "tools",
        action: "setpage",
        color:"orange"
    }),
    new Keybind({
        key: ["t","b"],
        mean: "test css bg",
        action: ({askThen}) => {
            askThen({
                prefix: "valid css background",
                doNext: (val) => {
                    document.head.innerHTML+=`<style>body {background:${val};}</style>`
                }
            })
        },
        color:"purple"
    }),
    new Keybind({
        key: ["t","i"],
        mean: "show image",
        action: ({askThen}) => {
            askThen({
                prefix: "valid css background",
                doNext: (val) => {
                    document.head.innerHTML+=`<style>body {background:#101012 url("${val}") no-repeat center;}</style>`
                }
            })
        },
        color:"purple"
    }),
    new Keybind({
        key: ["t","c"],
        mean: "color picker",
        action: "link;coolors.co",
        color:"blue"
    }),
    new Keybind({
        key: ["t","e"],
        mean: "edlinkme",
        action: "link;edlinkme.miftik.tk",
    }),
    new Keybind({
        key: ["a", "n"],
        mean: "notes app",
        action: "link;miftikcz.github.io/note_keeper",
    }),
    new Keybind({
        key: ["a", "i"],
        mean: "notepad",
        action: "link;miftik.tk/notepad",
    }),
    new Keybind({
        key: ["a", "t"],
        mean: "todo app",
        action: "link;miftikcz.github.io/todos_keeper",
    }),
    new Keybind({
        key: ["a", "r"],
        mean: "reddit",
        action: "link;reddit.com",
    }),
    new Keybind({
        key: ["a", "g"],
        mean: "chatgpt",
        action: "link;chat.openai.com/chat",
    }),
    new Keybind({
        key: ["s"],
        mean: "search on",
        action: "setpage",
        color:"orange"
    }),
    new Keybind({
        key: ["s", "g"],
        mean: "google",
        action: ({askThen}) => {
            askThen({
                prefix: "search with google",
                doNext: (val) => { window.open("https://google.com/search?q="+encodeURIComponent(val)) }
            })
        },
        color:"purple"
    }),
    new Keybind({
        key: ["s", "a"],
        action: ({askThen}) => {
            askThen({
                prefix: "search on AUR",
                doNext: (val) => { window.open("https://aur.archlinux.org/packages?K="+encodeURIComponent(val)) }
            })
        },
        mean: "AUR",
        color:"purple"
    }),
    new Keybind({
        key: ["s", "x"],        
        action: ({askThen}) => {
            askThen({
                prefix: "search with searxng",
                doNext: (val) => { window.open("https://searx.work/search?q="+encodeURIComponent(val)) }
            })
        },
        mean: "searxng",
        color:"purple"
    }),
])

function rerenderKeybinds(page="MAIN") {
    let elements = document.createElement("div")

    for(let i=0;i<keybinds.length;i++) {
        if(keybinds.at(i).showIn != page && !keybinds.at(i).showAlways) {   
            continue
        }
        if(keybinds.at(i).showAlways && page == "MAIN") {
            continue
        }
        let newEl = document.createElement("span")
        newEl.classList.add("keybind")

        if(keybinds.at(i).add_class) 
            newEl.classList.add(keybinds.at(i).add_class)

        newEl.innerHTML = `<span class="key">${keybinds.at(i).key}</span><span class="mean">${keybinds.at(i).mean}</span>`
        elements.appendChild(newEl)
    }

    document.getElementById("keybinds").innerHTML = ""
    document.getElementById("keybinds").appendChild(elements)
}

window.addEventListener("keypress", (key)=>{
    let out = keybinds.keybinds.find(e => e.key == key.key && (e.showIn == page || e.showAlways))
    if(out) {
        // console.log(document.activeElement.tagName)
        if(document.activeElement.tagName != "INPUT") {
            key.preventDefault()
        } else {
            return
        }
        if(out.action == "setpage") {
            page = out.key
            console.log("!")
            rerenderKeybinds(page)
        } else if(out.action == "setpage;default") {
            page = "MAIN"
            console.log("..")
            rerenderKeybinds(page)
        } else if(typeof out.action == "string" && out.action.startsWith("link;")) {
            window.open("https://"+out.action.substring(5))
        } else {
            console.log("!")
            out.action({
                showWidget: () => {

                },
                askThen: ({ 
                    prefix = "~",
                    doNext = (value="") => {
                        console.log("works!", value)
                    }
                }) => {
                    let el = document.createElement("div")
                    let input = document.createElement("input")
                    let _prefix = document.createElement("div")
                    _prefix.innerText = prefix,
                    _prefix.classList.add("prefix")

                    input.type = "text"
                    input.setAttribute("autofocus","true")
                    input.classList.add("input")
                    input.placeholder = "write something..."
                    input.onkeydown = (key) => {
                        if(key.key == "Enter") {
                            doNext(input.value)
                            el.remove()
                        } else if(key.key == "Escape") {
                            //doNext(input.value)
                            el.remove()
                        }
                    }

                    el.classList.add("bottom")

                    el.appendChild(_prefix)
                    el.appendChild(input)

                    document.getElementById("bottom").appendChild(el)
                }
            })
        }
    }
})

let page = "MAIN"

rerenderKeybinds(page)