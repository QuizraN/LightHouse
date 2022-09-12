import React from 'react'
import {atom,useRecoilState} from "recoil"

export const user=atom({
    key:"userName",
    default:false,
});

export const userDetails=atom({
    key:"userInfo",
    default:{displayName:"",email:"",photoURL:"",description:"",hobbies:"",isAdmin:""},
});