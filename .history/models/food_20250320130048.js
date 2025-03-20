import { Schema, model } from 'mongoose';
import validator from 'mongoose-unique-validator';

const schema = Schema({
    // code: {
    //     type: String,        
    //     required: true,    
    //     unique: true,
    // },
    name: String,
    // brand: String,
    // photo: String,
    
    // calories: Number,
    // carbs: Number,
    // fats: Number,
    // proteins: Number,
    // counter: {
    //     type: Number,
    //     default: 0,
    // }
});

schema.plugin(validator);

schema.methods.toJson = function() {
    return {
        id: this._id,
        // code: this.code,
        name: this.name,
        // brand: this.brand,
        // photo: this.photo,
        // calories: this.calories,
        // carbs: this.carbs,
        // fats: this.fats,
        // proteins: this.proteins,
        // counter: this.counter,
    }
};

export default model('Food', schema);
