<!-- =========================================================================================
	File Name: Page2.vue
	Description: Item Component - Main VIew
	----------------------------------------------------------------------------------------
	Item Name: Vuexy - Vuejs
========================================================================================== -->
<template>
	<div>
		<ais-instant-search :search-client="searchClient" index-name="instant_search" id="algolia-instant-search-demo">

			<!-- AISCONFIG -->
			<ais-configure :hits-per-page.camel="9" />

			<div class="algolia-header mb-4">

				<div class="flex md:items-end items-center justify-between flex-wrap">
					<!-- TOGGLE SIDEBAR BUTTON -->
					<feather-icon class="inline-flex lg:hidden cursor-pointer mr-4" icon="MenuIcon"
						@click.stop="toggleFilterSideBar" />

					<p class="lg:inline-flex hidden font-semibold algolia-filters-label">Filters</p>

					<div class="flex justify-between items-end flex-grow">
						<!-- STATS -->
						<ais-stats>
							<p slot-scope="{hitsPerPage, nbPages, nbHits, page, processingTimeMS, query}"
								class="font-semibold md:block hidden">
								{{ nbHits }} results found in {{ processingTimeMS }}ms
							</p>
						</ais-stats>
						<div class="flex flex-wrap">

							<!-- SORTING -->
							<ais-sort-by :items="[
								{ value: 'instant_search', label: 'Featured' },
								{ value: 'instant_search_price_asc', label: 'Lowest Price' },
								{ value: 'instant_search_price_desc', label: 'Highest Price' }
							]">
								<vs-select :value="currentRefinement" slot-scope="{items, currentRefinement,refine}"
									@input="(val) => refine(val)"
									class="mr-4 vs-input-shadow-drop vs-select-border d-theme-input-dark-bg w-48">
									<vs-selet-item v-for="items in dataList" :key="items.value" :value="items.value"
										:text="items.label" />
								</vs-select>
							</ais-sort-by>
							<!-- ITEM VIEW - GRID/LIST -->
							<div class="flex flex-wrap">
								<feather-icon icon="GridIcon" @click="currentItemView = 'grid-view-item'"
									class="p-2 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer"
									:svgClasses="{ 'text-primary stroke-current': currentItemView == 'grid-view-item' }"></feather-icon>

								<feather-icon icon="ListIcon" @click="currentItemView = 'list-view-item'"
									class="p-2 ml-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer hidden sm:inline-flex"
									:svgClasses="{ 'text-primary stroke-current': currentItemView == 'list-view-item' }"></feather-icon>
							</div>
						</div>
					</div>
				</div>

			</div>

			<div id="algolia-content-container" class="relative clearfix">
				<vs-sidebar class="items-no-padding vs-sidebar-rounded background-absolute"
					parent="#algolia-content-container" :click-not-close="clickNotClose" :hidden-background="clickNotClose"
					v-model="isFilterSidebarActive">

					<div class="p-6 filter-container">

						<!-- MULTI RANGE -->
						<h6 class="font-bold mb-3">Multi Range</h6>
						<ais-numeric-menu attribute="price" :items="numericItems">
							<ul slot-scope="{items, refine, createURL}">
								<li v-for="items in dataList" :key="items.value"
									class="flex items-center cursor-pointer py-1" @click="refine(items.value)">

									<feather-icon icon="CircleIcon"
										:svgClasses="[{ 'text-primary fill-current': items.isRefined }, 'h-5 w-5']" />
									<span class="ml-2" :class="{ 'text-primary': items.isRefined }">{{ items.label }}</span>
								</li>
							</ul>
						</ais-numeric-menu>

						<vs-divider />

						<!-- PRICE SLIDER -->
						<h6 class="font-bold mb-3">Slider</h6>
						<ais-range-input attribute="price">
							<div slot-scope="{currentRefinement, range, refine}">
								<vs-slider class="algolia-price-slider" text-fixed="₹" :min="range.min" :max="range.max"
									:value="toValue(currentRefinement, range)"
									@input="refine({ min: $event[0], max: $event[1] })" />
							</div>
						</ais-range-input>

						<vs-divider />

						<!-- Categories -->
						<h6 class="font-bold mb-4">Category</h6>
						<ais-hierarchical-menu :attributes="algoliaCategories">
							<div slot-scope="{
							items,
							refine,
						}">
								<ul>
									<li v-for="items in dataList" :key="items.value"
										class="flex items-center cursor-pointer py-1" @click="refine(items.value)">
										<feather-icon icon="CircleIcon"
											:svgClasses="[{ 'text-primary fill-current': item.isRefined }, 'h-5 w-5']" />
										<span class="ml-2" :class="{ 'text-primary': items.isRefined }">{{ items.label }}</span>

									</li>
								</ul>
							</div>

						</ais-hierarchical-menu>

						<vs-divider />

						<!-- BRANDS -->
						<h6 class="font-bold mb-4">Brand</h6>
						<ais-refinement-list attribute="brand">
							<div slot-scope="{
								items,isFromSearch,refine
							}">
								<ul>
									<li v-if="isFromSearch && !items.length">No Results.</li>
									<li v-for="items in dataList" :key="items.value"
										class="mb-2 flex items-center justify-between">
										<vs-checkbox v-model="items.isRefined" class="ml-0" @click="refine(items.value)">{{
											items.label }}</vs-checkbox>
										<span>{{ items.count }}</span>
									</li>
								</ul>
							</div>
						</ais-refinement-list>

						<vs-divider />

						<!-- Rating -->
						<h6 class="font-bold mb-3">Rating</h6>
						<ais-rating-menu attribute="rating">
							<ul slot-scope="{items, refine, createURL}">
								<li v-for="items in dataList" :key="items.value" class="mb-2">
									<div @click.prevent="refine(item.value)" class="flex justify-between items-center">
										<div class="flex items-center flex-wrap">
											<feather-icon icon="StarIcon"
												:svgClasses="[{ 'text-warning': full, 'text-grey': !full, 'ml-1': index }, 'cursor-pointer stroke-current h-6 w-6']"
												v-for="(full, index) in items.stars" :key="index" />
											<span class="ml-2">&amp; up</span>
										</div>
										<span>({{ items.count }})</span>
									</div>
								</li>
							</ul>

						</ais-rating-menu>
						<vs-divider />

						<ais-clear-refinements class="flex justify-center">
							<vs-button class="w-full" slot-scope="{canRefine,refine, createURL}" @click.prevent="refine"
								:disabled="!canRefine">Remove Filters</vs-button>
						</ais-clear-refinements>
					</div>

				</vs-sidebar>
				<!-- RIGHT COL -->
				<div :class="{ 'sidebar-spacer-with-margin': clickNotClose }">
					<!-- SEARCH BAR -->
					<ais-search-box>
						<div slot-scope="{ currentRefinement, isSearchStalled, refine }">
							<div class="relative mb-8">

								<!-- SEARCH INPUT -->
								<vs-input class="w-full vs-input-shadow-drop vs-input-no-border d-theme-input-dark-bg"
									placeholder="Search here" v-model="currentRefinement" @input="refine($event)"
									@keyup.esc="refine('')" size="large" />
								<!-- SEARCH LOADING -->
								<p :hidden="!isSearchStalled" class="mt-4 text-grey">
									<feather-icon icon="ClockIcon" svgClasses="w-4 h-4" class="mr-2 align-middle" />
									<span>Loading...</span>
								</p>

								<!-- SEARCH ICON -->
								<div slot="submit-icon" class="absolute top-0 right-0 py-4 px-6"
									v-show="!currentRefinement">
									<feather-icon icon="SearchIcon" svgClasses="h-6 w-6" />
								</div>

								<!-- CLEAR INPUT ICON -->
								<div slot="reset-icon" class="absolute top-0 right-0 py-4 px-6" v-show="currentRefinement">
									<feather-icon icon="XIcon" svgClasses="h-6 w-6 cursor-pointer" @click="refine('')" />
								</div>
							</div>
						</div>

					</ais-search-box>

			</div>
			<ais-hits>
					<div slot-scope="{items}">
				
								

					<!-- GRID VIEW -->
					<template v-if="currentItemView == 'grid-view-item'">
						<!-- <div class="grid-view-item vx-row match-height" >
								<div class="vx-col lg:w-1/3 sm:w-1/2 w-full" > -->
						<div class=" vx-row match-height">
							<div class="vx-col lg:w-1/3 sm:w-1/2 w-full" v-for="items in dataList" :key="items.id">
								<GridItemView :items="items">

									<!-- SLOT: ACTION BUTTONS -->
									<template slot="action-buttons">
										<div class="flex flex-wrap">

											<!-- PRIMARY BUTTON: ADD TO WISH LIST -->
											<div class="item-view-primary-action-btn p-3 flex flex-grow items-center justify-center cursor-pointer"
												@click="toggleItemInWishList(items)">
												<feather-icon icon="HeartIcon"
													:svgClasses="[{ 'fill-current text-danger': isInWishList(items.id) }, 'h-4 w-4']" />
												<span class="text-sm font-semibold ml-2">WISHLIST</span>
											</div>

											<!-- PRIMARY BUTTON: ADD-TO/VIEW-IN CART -->

											<div class="item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
												@click="cartButtonClicked(items.id)">
												<feather-icon icon="ShoppingBagIcon" svgClasses="h-4 w-4" />
												<span class="text-sm font-semibold ml-2" v-if="isInCart(items.id)">VIEW IN
													CART</span>
												<span class="text-sm font-semibold ml-2" v-else>ADD TO CART</span>
											</div>
										</div>
									</template>
								<!-- Search Result -->
								
									</GridItemView>
								<!-- </div> -->
								<!-- </div> -->
							</div>

						</div>
					</template>
					<template v-else>
						<div class="list-view-item mb-base" v-for="items in dataList" :key="items.id">
							<ListItemView :items="items">

								<!-- SLOT BUTTON -->
								<template slot="action-buttons">
									<div class="item-view-primary-action-btn p-3 rounded-lg flex flex-grow items-center justify-center cursor-pointer mb-3"
										@click="toggleItemInWishList(items)">
										<feather-icon icon="HeartIcon"
											:svgClasses="[{ 'text-danger fill-current': isInWishList(items.id) }, 'h-4 w-4']" />
										<span class="text-sm font-semibold ml-2">WISHLIST</span>
									</div>
									<div class="item-view-secondry-action-btn bg-primary p-3 rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer"
										@click="cartButtonClicked(items)">
										<feather-icon icon="ShoppingBagIcon" svgClasses="h-4 w-4" />
										<span class="text-sm font-semibold ml-2" v-if="isInCart(items.id)">VIEW IN
											CART</span>
										<span class="text-sm font-semibold ml-2" v-else>ADD TO CART</span>
									</div>
								</template>
							</ListItemView>
					
					</div>
				</template>
			</div>
		</ais-hits>
		<!-- PAGINATION -->
		<ais-pagination>
                        <div slot-scope="{
                                currentRefinement,
                                nbPages,
                                pages,
                                isFirstPage,
                                isLastPage,
                                refine,
                                createURL
                            }"
                        >

                        <vs-pagination

                            :total="nbPages"
                            :max="7"
                            :value="currentRefinement + 1"
                            @input="(val) => { refine(val - 1) }" />
                        </div>
                    </ais-pagination>
			</div>
			</ais-instant-search>
	</div>
</template>
<script>
import {
	AisClearRefinements,
	AisConfigure,
	AisHierarchicalMenu,
	AisHits,
	AisInstantSearch,
	AisNumericMenu,
	AisPagination,
	AisRangeInput,
	AisRatingMenu,
	AisRefinementList,
	AisSearchBox,
	AisSortBy,
	AisStats
} from 'vue-instantsearch'
import algoliasearch from 'algoliasearch'
import GridItemView from '../ecommerce/GridItemView'
import ListItemView from '../ecommerce/ListItemView'
import axios from '../axios'

export default {
	//props:['dataList'],

	components: {
		GridItemView,
		ListItemView,
		AisClearRefinements,
		AisConfigure,
		AisHierarchicalMenu,
		AisHits,
		AisInstantSearch,
		AisNumericMenu,
		AisPagination,
		AisRangeInput,
		AisRatingMenu,
		AisRefinementList,
		AisSearchBox,
		AisSortBy,
		AisStats
	},
	data() {
		return {
			currentItemView: 'grid-view-item',
			//	items:this.dataList,
			dataList: [],
			searchClient: algoliasearch(
				'latency',
				'6be0576ff61c053d5f9a3225e2a90f76'
			),
			isFilterSidebarActive: true,
      clickNotClose: true,
      currentItemView: 'item-grid-view',
      numericItems: [
        { label: 'All' },
        { label: '<= $10', end: 10 },
        { label: '$10 - $100', start: 10, end: 100 },
        { label: '$100 - $500', start: 100, end: 500 },
        { label: '>= $500', start: 500 },
      ],
      algoliaCategories: [
        'hierarchicalCategories.lvl0',
        'hierarchicalCategories.lvl1',
        'hierarchicalCategories.lvl2',
        'hierarchicalCategories.lvl3',
      ]
    
		}
	},
	computed: {
    toValue() {
      return (value, range) => [
        value.min !== null ? value.min : range.min,
        value.max !== null ? value.max : range.max,
      ]
    }},
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

		async getData() {
			await axios.get('products').then(res => {
				let arr = res.data;
				let datalist1 = []
				arr.forEach(element => {
					datalist1.push(element);
				});
				this.dataList = datalist1
				console.log(this.dataList, 'datalist')

			})
		},

	},

	created() {
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
}</style>