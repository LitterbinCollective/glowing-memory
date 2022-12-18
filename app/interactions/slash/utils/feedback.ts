import { Constants, Interaction } from 'detritus-client';

import { sendFeedback } from '@/modules/utils';

import { BaseSlashCommand } from '../../base';

export default class FeedbackCommand extends BaseSlashCommand {
  public name = 'feedback';
  public description = 'Send us what do you think of this application!';

  constructor() {
    super({
      options: [
        {
          name: 'feedback',
          description: 'Feedback message',
          type: Constants.ApplicationCommandOptionTypes.STRING,
          required: true,
        },
        {
          name: 'anonymous',
          description: 'Do you wish to be anonymous?',
          type: Constants.ApplicationCommandOptionTypes.BOOLEAN,
          default: () => false,
        },
      ],
    });
  }

  public async run(
    ctx: Interaction.InteractionContext,
    { feedback, anonymous }: Interaction.ParsedArgs
  ) {
    let text = 'Failed to submit feedback.';

    if (sendFeedback(ctx.rest, feedback, anonymous ? undefined : ctx.user))
      text = 'Your feedback has been sent to our server, thank you!';

    ctx.editOrRespond(text);
  }
}
