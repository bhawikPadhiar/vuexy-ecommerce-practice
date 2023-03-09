<!-- eslint-disable no-mixed-spaces-and-tabs -->
<!-- eslint-disable no-mixed-spaces-and-tabs -->
<template>
	<div>
	<h4>You are in home.</h4>
	// eslint-disable-next-line vue/no-parsing-error
	<input type="file" @change="onFileSelected">
		<button @click="onUpload">Upload</button>
		<button @click="save">save</button>
		<!-- <img v-bind:src="imageAsBase64"> -->
		<li v-for="user in id" :key="user.id" >
		<img v-bind:src="imageAsBase64">
		<!-- <img v-bind:src="imageAsBase64">{{ user.imageAsBase64 }}</img> -->
		<!-- <img :src="'data:image/png;base64,' + item.ItemImageData "> -->
	</li>
</div>
</template>

<script>
//import axios from 'axios'
//import * as fs from 'fs';
//import fs from 'file-system'

import axios from '../axios';

export default{
	// name:'home',
	data(){ return{
		id:'',
		name:'',
		profile:'',
selectedFile: null,
imageAsBase64: []
	}},
	
	methods:{
		save(){
			const FileSaver = require('file-saver');
			FileSaver.saveAs("", "image.jpg");
	// 		var blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});
    // FileSaver.saveAs(blob, "hello world.txt");
			//let data= "jkhdsfjkhdfsjkhdfsj";
		// 	//const text =  new Response(blob).text();
		// 	//const fs = require('fs');
			//
		// const fs = require('fs');
		// 	try{
		// 		fs.writeFileSync('myfile.txt',data);
		// 	}catch(e){console.log(e)
		// 		alert('failed to save the file')}
		// 	console.log(fs.writeFileSync('myfile.txt'),'filesync')
		},

		async start(){
			await axios.get(`profile`).then(res =>  {
          let array = res.data;
		
		const arr = Array.from(array);
		console.log(arr,'arr');
          arr.forEach(element => {
            this.imageAsBase64 = element.image;
			//console.log(this.imageAsBase64,'imageAsBase');
			this.id = element.id;})	
		});
// 		('input[type="file"]').on('change', function () {
//     var reader = new FileReader();
//     reader.onload = function () {
//         var thisImage = reader.result;
//         localStorage.setItem("imgData", thisImage);
//     };
//     reader.readAsDataURL(this.files[0]);
// });
		},
///////////////////////////////// passing selectedFile ///////////////////////////////////////
		
		onFileSelected(event){
			this.selectedFile = event.target.files[0];
			this.createBase64Image(this.selectedFile)
		},

///////////////////////////////// Converting image to base64 ///////////////////////////////////////
		
		createBase64Image(fileObject){
			const reader = new FileReader();
			reader.onload = (e) =>{
				this.image = e.target.result;
				this.onUpload();	
			};
			reader.readAsDataURL(fileObject);
			console.log(fileObject,'fileobject')
		
			
		},
		onUpload(){
			console.log(this,'this')
			const {image} = this;
			axios.post('profile',{image}).then(res => {
			console.log(res);
			const obj = {res};
			const blob = new Blob([JSON.stringify(obj,null,2)],{
				type:"application/json"
		});
			const FileSaver = require('file-saver');
    FileSaver.saveAs(blob, "hello world.txt");
			// var url  = window.URL.createObjectURL(blob);	
			// window.location.assign(url);
			localStorage.setItem("imgData",blob);
			
			//console.log(text,'text')
		})
		
		}	
	},
	created(){
		this.start()
		//  await axios.get(`http://localhost:3000/profile`).then(res =>  {
        //   let arr = res;
		//   console.log(arr,'arr');
        //   arr.forEach(element => {
			
        //     this.imageAsBase64 = element.image;
		// 	console.log(this.imageAsBase64,'imageAsBase');
		// this.id = element.id;})	
		//    } );	 
// 		this.imageAsBase64 = response.data.image,
// 		this.id = response.data.id,
// 		console.log(this.id,'id')
//  console.log(this.imageAsBase64,'imageAsBase64')
		}
	}


</script>