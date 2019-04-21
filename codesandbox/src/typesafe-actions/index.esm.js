import { __assign } from 'tslib';

function checkIsEmpty(arg, argPosition) {
    if (argPosition === void 0) { argPosition = 1; }
    return arg == null;
}
function throwIsEmpty(argPosition) {
    if (argPosition === void 0) { argPosition = 1; }
    throw new Error("Argument " + argPosition + " is empty.");
}
function checkValidActionCreator(arg) {
    return typeof arg === 'function' && 'getType' in arg;
}
function checkInvalidActionCreator(arg) {
    return !checkValidActionCreator(arg);
}
function throwInvalidActionCreator(argPosition) {
    if (argPosition === void 0) { argPosition = 1; }
    throw new Error("Argument " + argPosition + " is invalid, it should be an action-creator instance from \"typesafe-actions\"");
}
function checkInvalidActionCreatorInArray(arg, idx) {
    if (arg == null) {
        throw new Error("Argument contains array with empty element at index " + idx);
    }
    else if (arg.getType == null) {
        throw new Error("Argument contains array with invalid element at index " + idx + ", it should be an action-creator instance from \"typesafe-actions\"");
    }
}
function checkValidActionType(arg) {
    return typeof arg === 'string' || typeof arg === 'symbol';
}
function checkInvalidActionType(arg) {
    return !checkValidActionType(arg);
}
function throwInvalidActionType(argPosition) {
    if (argPosition === void 0) { argPosition = 1; }
    throw new Error("Argument " + argPosition + " is invalid, it should be an action type of type: string | symbol");
}
function checkInvalidActionTypeInArray(arg, idx) {
    if (arg == null) {
        throw new Error("Argument contains array with empty element at index " + idx);
    }
    else if (typeof arg !== 'string' && typeof arg !== 'symbol') {
        throw new Error("Argument contains array with invalid element at index " + idx + ", it should be of type: string | symbol");
    }
}
function throwInvalidActionTypeOrActionCreator(argPosition) {
    if (argPosition === void 0) { argPosition = 1; }
    throw new Error("Argument " + argPosition + " is invalid, it should be an action-creator instance from \"typesafe-actions\" or action type of type: string | symbol");
}

function action(type, payload, meta, error) {
    if (checkIsEmpty(type)) {
        throwIsEmpty(1);
    }
    if (checkInvalidActionType(type)) {
        throwInvalidActionCreator(1);
    }
    return { type: type, payload: payload, meta: meta, error: error };
}

function createAction(type, createHandler) {
    var actionCreator = createHandler == null
        ? (function () { return action(type); })
        : createHandler(action.bind(null, type));
    return Object.assign(actionCreator, {
        getType: function () { return type; },
        toString: function () { return type; },
    });
}

function createCustomAction(type, createHandler) {
    if (checkIsEmpty(type)) {
        throwIsEmpty(1);
    }
    if (checkInvalidActionType(type)) {
        throwInvalidActionType(1);
    }
    var actionCreator = createHandler != null ? createHandler(type) : (function () { return ({ type: type }); });
    return Object.assign(actionCreator, {
        getType: function () { return type; },
        toString: function () { return type; },
    });
}

function createStandardAction(type) {
    if (checkIsEmpty(type)) {
        throwIsEmpty(1);
    }
    if (checkInvalidActionType(type)) {
        throwInvalidActionType(1);
    }
    function constructor() {
        return createCustomAction(type, function (_type) { return function (payload, meta) { return ({
            type: _type,
            payload: payload,
            meta: meta,
        }); }; });
    }
    function map(fn) {
        return createCustomAction(type, function (_type) { return function (payload, meta) {
            return Object.assign(fn(payload, meta), { type: _type });
        }; });
    }
    return Object.assign(constructor, { map: map });
}

function createAsyncAction(requestType, successType, failureType) {
    [requestType, successType, failureType].forEach(checkInvalidActionTypeInArray);
    function constructor() {
        return {
            request: createCustomAction(requestType, function (type) { return function (payload) { return ({
                type: type,
                payload: payload,
            }); }; }),
            success: createCustomAction(successType, function (type) { return function (payload) { return ({
                type: type,
                payload: payload,
            }); }; }),
            failure: createCustomAction(failureType, function (type) { return function (payload) { return ({
                type: type,
                payload: payload,
            }); }; }),
        };
    }
    return Object.assign(constructor);
}

function getType(actionCreator) {
    if (checkIsEmpty(actionCreator)) {
        throwIsEmpty(1);
    }
    if (checkInvalidActionCreator(actionCreator)) {
        throwInvalidActionCreator(1);
    }
    return actionCreator.getType();
}

function createReducer(initialState, initialHandlers) {
    if (initialHandlers === void 0) { initialHandlers = {}; }
    var handlers = __assign({}, initialHandlers);
    var rootReducer = function (state, action) {
        if (state === void 0) { state = initialState; }
        if (handlers.hasOwnProperty(action.type)) {
            var reducer = handlers[action.type];
            if (typeof reducer !== 'function') {
                throw Error("Reducer under \"" + action.type + "\" key is not a valid reducer");
            }
            return reducer(state, action);
        }
        else {
            return state;
        }
    };
    var handleAction = (function (singleOrMultipleCreatorsAndTypes, reducer) {
        var creatorsAndTypes = Array.isArray(singleOrMultipleCreatorsAndTypes)
            ? singleOrMultipleCreatorsAndTypes
            : [singleOrMultipleCreatorsAndTypes];
        var newHandlers = {};
        creatorsAndTypes
            .map(function (acOrType) {
            return checkValidActionCreator(acOrType)
                ? getType(acOrType)
                : checkValidActionType(acOrType)
                    ? acOrType
                    : throwInvalidActionTypeOrActionCreator();
        })
            .forEach(function (type) { return (newHandlers[type] = reducer); });
        return createReducer(initialState, __assign({}, handlers, newHandlers));
    });
    return Object.assign(rootReducer, {
        handlers: __assign({}, handlers),
        handleAction: handleAction,
    });
}

function isOfType(actionTypeOrTypes, action) {
    if (checkIsEmpty(actionTypeOrTypes)) {
        throwIsEmpty(1);
    }
    var actionTypes = Array.isArray(actionTypeOrTypes)
        ? actionTypeOrTypes
        : [actionTypeOrTypes];
    actionTypes.forEach(checkInvalidActionTypeInArray);
    var assertFn = function (_action) { return actionTypes.includes(_action.type); };
    if (action === undefined) {
        return assertFn;
    }
    return assertFn(action);
}

function isActionOf(actionCreatorOrCreators, action) {
    if (checkIsEmpty(actionCreatorOrCreators)) {
        throwIsEmpty(1);
    }
    var actionCreators = Array.isArray(actionCreatorOrCreators)
        ? actionCreatorOrCreators
        : [actionCreatorOrCreators];
    actionCreators.forEach(checkInvalidActionCreatorInArray);
    var assertFn = function (_action) {
        return actionCreators.some(function (actionCreator) { return _action.type === actionCreator.getType(); });
    };
    if (action === undefined) {
        return assertFn;
    }
    return assertFn(action);
}

function createActionDeprecated(actionType, creatorFunction) {
    var actionCreator;
    if (creatorFunction != null) {
        if (typeof creatorFunction !== 'function') {
            throw new Error('second argument is not a function');
        }
        actionCreator = creatorFunction;
    }
    else {
        actionCreator = (function () { return ({ type: actionType }); });
    }
    if (actionType != null) {
        if (typeof actionType !== 'string' && typeof actionType !== 'symbol') {
            throw new Error('first argument should be type of: string | symbol');
        }
    }
    else {
        throw new Error('first argument is missing');
    }
    return actionCreator;
}

export { action, createAction, createStandardAction, createCustomAction, createAsyncAction, createReducer, getType, isOfType, isActionOf, createActionDeprecated };
