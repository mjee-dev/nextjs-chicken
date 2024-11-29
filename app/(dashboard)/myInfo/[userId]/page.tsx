'use client';

import React from "react";

export default function userIdDetails(props: any) {
    console.log(`props : ${props}`);
    //props : {"params":{"userId":"1"},"searchParams":{}}
    return (
        <div>
            myInfo {props.params.userId} Details
        </div>
    );
}
