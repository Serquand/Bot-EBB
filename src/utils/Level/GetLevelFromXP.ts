const getLevelFromXP: Function = (xp : number): number => {
    for(let i = 0; ; i++) {
        const experienceLevel: number = 10 * Math.floor(Math.pow(i, 2.5))
        if(experienceLevel > xp) return i - 1;
    }
}

export default getLevelFromXP;