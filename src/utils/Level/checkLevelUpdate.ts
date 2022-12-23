const checkLevelUpdate : Function = (experience: number, gain: number): number => {
    const newExperience: number = experience + gain
    for(let i = 0; ; i++) {
        const experienceLevel: number = 10 * Math.floor(Math.pow(i, 2.5))
        if(experienceLevel > experience) {
            if(newExperience > experienceLevel) return i
            return 0
        }
    }
}

export default checkLevelUpdate;