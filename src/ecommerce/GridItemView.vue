<!-- =========================================================================================
	File Name: GridItemView.vue
	Description: Item Component - Grid VIew
	----------------------------------------------------------------------------------------
	Item Name: Vuexy - Vuejs
========================================================================================== -->
<template>
		<!-- <div class="vx-row"> -->
        <!-- <div class="grid-view-item vx-col" > -->
			<!-- <div class=" vx-row match-height" >
				<div class="vx-col lg:w-1/3 sm:w-1/2 w-full" v-for="items in dataList" :key="items.id"> -->
			<vx-card class="grid-view-item mb-base overflow-hidden mt-3" v-on="$listeners">	
				<template slot="no-body">
					
					<div class="item-img-container bg-white h-64 flex items-center justify-center mb-4 cursor-pointer">
						<img :src="items.img" class='grid-view-img px-4' alt="">
					</div>
					<div class="item-details px-4">

						<!-- RATING & PRICE -->
						<div class="flex justify-between items-center">
							<div class="text-warning border border-solid border-warning flex py-1 px-2 rounded">
								<span class="text-sm mr-1">5</span>
								<feather-icon icon="StarIcon" svgClasses="h-4 w-4" />
							</div>
							<h6 class="font-bold">{{ items.price }}</h6>
						</div>

						<div class="my-4">
							<h5 class="truncate font-semibold mb-1 hover:text-primary cursor-pointer">{{ items.name }}</h5>
							<p class="item-description truncate text-sm">Trial Description</p>
						</div>
					</div>
					<slot name="action-buttons"></slot>
				</template>
			</vx-card>
		
		<!-- </div>
		
	</div> -->
</template>
<script>


export default{
	props:['items'],
	data(){
		return{
	item:[],
	
		}
	},

	

}
</script>
<style lang="scss">
.grid-view-item {
	.grid-view-img {
		max-width: 100%;
		max-height: 100%;
		width: auto;
		transition: .35s;
	}

	&:hover {
		transform: translateY(-5px);
		box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, .25);

		.grid-view-img {
			opacity: 0.9;
		}
	}
}
</style>