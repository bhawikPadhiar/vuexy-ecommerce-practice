<!-- =========================================================================================
	File Name: Page2.vue
	Description: Item Component - Main VIew
	----------------------------------------------------------------------------------------
	Item Name: Vuexy - Vuejs
========================================================================================== -->
<template>
	<div>
		<!-- <div> -->
			<!-- ITEM VIEW - GRID/LIST -->
			<div class="flex flex-wrap">
				<feather-icon icon="GridIcon" @click="currentItemView = 'grid-view-item'"
					class="p-2 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer"
					:svgClasses="{ 'text-primary stroke-current': currentItemView == 'grid-view-item' }"></feather-icon>

				<feather-icon icon="ListIcon" @click="currentItemView = 'list-view-item'"
					class="p-2 ml-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer hidden sm:inline-flex"
					:svgClasses="{ 'text-primary stroke-current': currentItemView == 'list-view-item' }"></feather-icon>
			</div>
		<!-- </div> -->
	<div>
		
			<!-- GRID VIEW -->
			<template v-if="currentItemView == 'grid-view-item'">
				<!-- <div class="grid-view-item vx-row match-height" >
					<div class="vx-col lg:w-1/3 sm:w-1/2 w-full" > -->
						<div class=" vx-row match-height" >
				<div class="vx-col lg:w-1/3 sm:w-1/2 w-full" v-for="items in dataList" :key="items.id">
				<GridItemView :items="items">
					
					<!-- SLOT: ACTION BUTTONS -->
					<template slot="action-buttons">
						<div class="flex flex-wrap">
							<!-- PRIMARY BUTTON: ADD TO WISH LIST -->
							<div class="item-view-primary-action-btn p-3 flex flex-grow items-center justify-center cursor-pointer"
								@click="toggleItemInWishList(items)">
								<feather-icon icon="HeartIcon"
									:svgClasses="[{	'fill-current text-danger': isInWishList(items.id)}, 'h-4 w-4']" />
								<span class="text-sm font-semibold ml-2">WISHLIST</span>
							</div>

							<!-- PRIMARY BUTTON: ADD-TO/VIEW-IN CART -->

							<div class="item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
								@click="cartButtonClicked(items.id)">
								<feather-icon icon="ShoppingBagIcon" svgClasses="h-4 w-4" />
								<span class="text-sm font-semibold ml-2" v-if="isInCart(items.id)">VIEW IN CART</span>
								<span class="text-sm font-semibold ml-2" v-else>ADD TO CART</span>
							</div>
						</div>
					</template>
				</GridItemView>
				<!-- </div> -->
				<!-- </div> -->
			</div>
		
	</div>
			</template>
		</div>

	</div>
</template>
<script>
import GridItemView from '../ecommerce/GridItemView'
import axios from '../axios'

export default {
	//props:['dataList'],

	components: {
		GridItemView
	},
	data() {
		return {
			currentItemView: 'grid-view-item',
		//	items:this.dataList,
		dataList:[]
		}
	},
	methods: {
		toggleItemInWishList() {
			//console.log(param);
			//this.isInWishList(param)
		},
		isInWishList() {
			
			
		},
		cartButtonClicked(param) {
			console.log(param)
		},
		isInCart(param) {
			console.log(param)
		},
	
		async getData(){
			await axios.get('products').then(res => {
				let arr = res.data;
				let datalist1 = []
				arr.forEach(element => {
				datalist1.push(element);
			});	
			this.dataList=datalist1
			console.log(this.dataList,'datalist')
				
			})
		},
		
	},

	created(){
		this.getData()
	}

	
}

</script>
<style>
.item-view-primary-action-btn {
	color: #2c2c2c !important;
	background-color: #f6f6f6;
	min-width: 50%;
}

.item-view-secondary-action-btn {
	min-width: 50%;
}
</style>