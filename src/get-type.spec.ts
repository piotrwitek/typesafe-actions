import * as TH from './type-helpers';
import { createAction } from './create-action';
import { createCustomAction } from './create-custom-action';
import { getType } from './get-type';

// @dts-jest:group from createAction
{
  // @dts-jest:pass:snap
  getType(createAction('CREATE_ACTION')()); // => 'CREATE_ACTION'
}

// @dts-jest:group from createCustomAction
{
  // @dts-jest:pass:snap
  getType(createCustomAction('CREATE_CUSTOM_ACTION')); // => 'CREATE_CUSTOM_ACTION'
}

// @dts-jest:group from RTK-like action creator metadata
{
  const rtkLike = Object.assign(
    () => ({ type: 'RTK_ACTION' as 'RTK_ACTION' }),
    {
      type: 'RTK_ACTION' as 'RTK_ACTION',
      match: (
        action: { type: string }
      ): action is { type: 'RTK_ACTION' } => action.type === 'RTK_ACTION',
    }
  );

  // @dts-jest:pass:snap
  getType(rtkLike); // => 'RTK_ACTION'
}
