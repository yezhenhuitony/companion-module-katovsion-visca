// feedbacks.js - 
const { combineRgb } = require('@companion-module/base');

class FeedbackManager {
    constructor(self) {
        this.self = self;
    }

    initializeFeedbacks() {
        this.self.setFeedbackDefinitions({
            ChannelState: this.createChannelStateFeedback()
        });
    }

    createChannelStateFeedback() {
        return {
            name: 'Channel State Feedback',
            type: 'boolean',
            label: 'Channel State',
            defaultStyle: {
                bgcolor: combineRgb(255, 0, 0),
                color: combineRgb(0, 0, 0),
            },
            options: [
                {
                    id: 'num',
                    type: 'number',
                    label: 'Test Value',
                    default: 5,
                    min: 0,
                    max: 10,
                },
            ],
            callback: (feedback) => {
                console.log('Feedback triggered with value:', feedback.options.num);
                return feedback.options.num > 5;
            },
        };
    }
}

module.exports = async function (self) {
    const feedbackManager = new FeedbackManager(self);
    feedbackManager.initializeFeedbacks();
};