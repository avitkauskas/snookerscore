export const FORM_VALIDATION_RULES =
{
    inline: true,
    on: 'change',
    fields: {
        country: {
            rules: [
                {
                    type: 'empty',
                    prompt: 'Please select a country'
                }
            ]
        },
        city: {
            rules: [
                {
                    type: 'empty',
                    prompt: 'Please enter a city name'
                },
                {
                    type: 'maxLength[30]',
                    prompt: 'Cannot be longer than {ruleValue} characters'
                }
            ]
        },
        venue: {
            rules: [
                {
                    type: 'maxLength[40]',
                    prompt: 'Cannot be longer than {ruleValue} characters'
                }
            ]
        },
        event: {
            rules: [
                {
                    type: 'maxLength[40]',
                    prompt: 'Cannot be longer than {ruleValue} characters'
                }
            ]
        },
        datetime: {
            rules: [
                {
                    type: 'empty',
                    prompt: 'Please enter a date and time'
                }
            ]
        },
        frames: {
            rules: [
              {
                  type: 'empty',
                  prompt: 'Please enter the number of frames'
              },
              {
                  type: 'integer[1..99]',
                  prompt: 'Must be between 1 and 99'
              }
            ]
        },
        reds: {
            rules: [
              {
                  type: 'empty',
                  prompt: 'Please enter the number of reds'
              },
              {
                  type: 'integer[1..15]',
                  prompt: 'Must be between 1 and 15'
              }
            ]
        },
        player1: {
            rules: [
              {
                  type: 'empty',
                  prompt: 'Please enter a name of a player'
              },
              {
                  type: 'maxLength[25]',
                  prompt: 'Cannot be longer than {ruleValue} characters'
              }
            ]
        },
        player2: {
            rules: [
              {
                  type: 'empty',
                  prompt: 'Please enter a name of a player'
              },
              {
                  type: 'maxLength[25]',
                  prompt: 'Cannot be longer than {ruleValue} characters'
              }
            ]
        },
        handicap1: {
            rules: [
                {
                    type: 'regExp[/^(-[1-9][0-9]*|[0-9]*|)$/]',
                    prompt: 'Must be a positive or negative number'
                }
            ]
        },
        handicap2: {
            rules: [
                {
                    type: 'regExp[/^(-[1-9][0-9]*|[0-9]*|)$/]',
                    prompt: 'Must be a positive or negative number'
                }
            ]
        }
    }
};
