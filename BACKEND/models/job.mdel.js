import mongoose from "mongoose";

const jobScheama = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirement:[{
        type:String,
    }],
    salary:{
        type:Number,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    jobType:{
        type:String,
        required:true
    },
    position:{
        type:Number,
        required:true
    },
    company:{
        type:mongoose.Schema.ObjectId,
        ref:"Company",
        required:true
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    applications:[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Application",
        }
    ]
},{timestamps:true});


export const Job = mongoose.model("Job",jobScheama);