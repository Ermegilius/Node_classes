'use strict';

const CODES = {
    PROGRAM_ERROR: 0,
    NOT_FOUND: 1,
    INSERT_OK: 2,
    NOT_INSERTED:3,
    ALLREADY_IN_USE:4,
    REMOVE_OK:5,
    NOT_REMOVED:6
}

const TYPES = {
    ERROR: 'error',
    INFO: 'info'
}

const MESSAGES = {
    PROGRAM_ERROR: () => ({
        message: 'Sorry! Error in the program',
        code: CODES.PROGRAM_ERROR,
        type: TYPES.ERROR
    }),
    NOT_FOUND: (key, value) => ({
        message: `No resource found with ${key} ${value}`,
        code: CODES.NOT_FOUND,
        type: TYPES.ERROR,
    }),
    INSERT_OK: (key, value) => ({
        message: `Resource with ${key} ${value} was inserted`,
        code: CODES.INSERT_OK,
        type: TYPES.INFO
    }),
    NOT_INSERTED:()=>({
        message:'Resource not inserted',
        code:CODES.NOT_INSERTED,
        type:TYPES.ERROR
    }),
    ALLREADY_IN_USE: value=>({
        message:`Key ${value} was already in use`,
        code:CODES.ALLREADY_IN_USE,
        type:TYPES.ERROR
    }),
    REMOVE_OK:(key,value)=>({
        message:`Resource with ${key} ${value} was removed`,
        code:CODES.REMOVE_OK,
        type:TYPES.INFO
    }),
    NOT_REMOVED:(key,value)=>({
        message:`No resource removed with ${key} ${value}`,
        code:CODES.NOT_REMOVED,
        type:TYPES.ERROR
    })
}

module.exports={CODES, TYPES, MESSAGES}