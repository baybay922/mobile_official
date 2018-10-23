// console.log(navigator)
let initState = {
    language:'zh-CN'
}
let reducer = (state=initState,action) => {
    switch(action.type){
        case "CHANGE_LANGUAGE":
            return {language:action.language}
        default:
            return state;
    }
}

export default reducer

