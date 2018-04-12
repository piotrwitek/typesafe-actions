import {
  StringType,
  PayloadAction,
  PayloadMetaAction,
  B,
  U,
  EACreator,
  EmptyOrPayload,
  TypeMeta,
  withType,
} from './';

export interface BuildAsyncAction<
  RT extends StringType,
  ST extends StringType,
  FT extends StringType,
  RM extends (arg: any) => any,
  SM extends (arg: any) => any,
  FM extends (arg: any) => any
> {
  withTypes<RP, SP, FP>(): AsyncCreator<RT, ST, FT, RP, SP, FP>;
  withMappers<RA, SA, FA>(
    requestMapper: RM,
    successMapper?: SM,
    failureMapper?: FM
  ): AsyncCreator<
    RT,
    ST,
    FT,
    RM extends (requestArg: RA) => infer RP ? RP : never,
    SM extends (requestArg: SA) => infer SP ? SP : never,
    FM extends (requestArg: FA) => infer FP ? FP : never
  >;
}

export type AsyncCreator<
  RT extends StringType,
  ST extends StringType,
  FT extends StringType,
  RequestPayload,
  SuccessPayload,
  FailurePayload
> = {
  request: EmptyOrPayload<RT, B<RequestPayload>>;
  success: EmptyOrPayload<ST, B<SuccessPayload>>;
  failure: EmptyOrPayload<FT, B<FailurePayload>>;
};

/** implementation */
export function buildAsyncAction<
  RT extends StringType,
  ST extends StringType,
  FT extends StringType,
  RM extends (arg: any) => any,
  SM extends (arg: any) => any,
  FM extends (arg: any) => any
>(requestType: RT, successType: ST, failureType: FT): BuildAsyncAction<RT, ST, FT, RM, SM, FM> {
  [requestType, successType, failureType].forEach((arg, idx) => {
    if (arg == null) {
      throw new Error(`Argument (${idx}) is missing`);
    } else {
      if (typeof arg !== 'string' && typeof arg !== 'symbol') {
        throw new Error(`Argument (${idx}) should be of type: string | symbol`);
      }
    }
  });
  function withTypes<RP, SP, FP>() {
    const requestCreator = (payload: RP) => ({
      type: requestType,
      ...{ payload: payload != null ? payload : undefined },
    });
    const successCreator = (payload: SP) => ({
      type: successType,
      ...{ payload: payload != null ? payload : undefined },
    });
    const failureCreator = (payload: FP) => ({
      type: failureType,
      ...{ payload: payload != null ? payload : undefined },
    });

    return {
      request: withType(requestType, requestCreator),
      success: withType(successType, successCreator),
      failure: withType(failureType, failureCreator),
    };
  }

  function withMappers<RA, SA, FA>(requestMapper: RM, successMapper?: SM, failureMapper?: FM) {
    const requestCreator = (payload: RA) => ({
      type: requestType,
      ...{ payload: requestMapper != null ? requestMapper(payload) : undefined },
    });
    const successCreator = (payload: SA) => ({
      type: successType,
      ...{ payload: successMapper != null ? successMapper(payload) : undefined },
    });
    const failureCreator = (payload: FA) => ({
      type: failureType,
      ...{ payload: failureMapper != null ? failureMapper(payload) : undefined },
    });

    return {
      request: withType(requestType, requestCreator),
      success: withType(successType, successCreator),
      failure: withType(failureType, failureCreator),
    };
  }

  const actionBuilder = {
    withTypes,
    withMappers,
  };
  return actionBuilder as any;
}
