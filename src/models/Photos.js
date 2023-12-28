import {Schema , model , models} from 'mongoose'

const PhotosSchema = new Schema({
    url : {
        type : String,
        required : true
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : 'Users',
        required : true
    },
    category : {
        type : Schema.Types.ObjectId,
        ref : 'Categories'
    },
},{
    timestamps : true
})

export default models.Photo || model('Photo' , PhotosSchema)
