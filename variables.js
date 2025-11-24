// variables.js  
class VariableManager {
    constructor(self) {
        this.self = self;
    }

    initializeVariables() {
        const variableDefinitions = [
            { variableId: 'variable1', name: 'My first variable' },
            { variableId: 'variable2', name: 'My second variable' },
            { variableId: 'variable3', name: 'Another variable' },
        ];

        this.self.setVariableDefinitions(variableDefinitions);
    }
}

module.exports = function (self) {
    const variableManager = new VariableManager(self);
    variableManager.initializeVariables();
};