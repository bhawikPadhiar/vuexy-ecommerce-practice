<!-- =========================================================================================
    File Name: LitsItemVue.vue
    Description: Item Component - List VIew
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs
========================================================================================== -->

<template>
    <vx-card class="list-view-item overflow-hidden mt-3">
        <template slot="no-body">
            <div class="vx-row item-details no-gutter">
             
        <!-- IMG COL -->
                <div class="vx-col sm:w-1/4 w-full item-img-container bg-white flex items-center justify-center cursor-pointer" @click="navigate_to_detail_view">
                <img :src="items.img" :alt="items.name" class="grid-view-img p-4">
                </div>
                <!-- ITEM NAME & DESC COL -->
                <div class="vx-col sm:w-1/2">
                    <slot name="item-meta">
                        <h6 class="item-name font-semibold mb-1 hover:text-primary cursor-pointer" @click="navigate_to_detail_view">{{ items.name }}</h6>
                        <p class="text-sm mb-4">By<span class="font-semibold cursor-pointer">brand</span></p>
                        <p class="item-description text-sm">trial Description</p> 
                    </slot>
                </div>
                <!-- PURCHASE COL -->
                <div class="vx-col sm:w-1/4 w-full flex items-center sm:border border-0 border-solid d-theme-border-grey-light border-r-0 boder-t-0 border-b-0">

                    <div class="p-4 flex flex-col w-full">

                        <div class="text-warning flex self-end border border-solid border-warning py-1 px-2 rounded">
                            <span class="text-sm mr-1">5</span>
                            <feather-icon icon="StarIcon" svgClasses="h-4 w-4" />
                            <span class="text-sm ml-2">Free Shipping</span>
                        </div>
                        <div class="my-6">
                            <h5 class="font-bold text-center">${{ items.price }}</h5>
                            <span class="text-gray flex items-start justify-center mt-1" v-if="items.free_shipping">
                            <feather-icon icon="ShoppingCartIcon" svgClasses="w-4 h-4" />
                            <span class="text-sm ml-2">Free Shipping</span>
                            </span>
                        </div>
                        <!-- SLOT: ACTION BUTTONS -->
                        <slot name="action-buttons" />
                    </div>

                </div>
            </div>

        </template>
    </vx-card>
    
</template>
<script>

export default{

    props:['items'],

   methods:{

       navigate_to_detail_view(){
        
       }
   }
   }

</script>


<style lang="scss" scoped>
.list-view-item {
    .item-name, .item-description {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .item-name {
        -webkit-line-clamp: 2;
    }

    .item-description {
        -webkit-line-clamp: 5;
    }

    .grid-view-img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        transition: .35s;
    }

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0px 4px 25px 0px rgba(0,0,0,.25);

        .grid-view-img{
            opacity: 0.9;
        }
    }
}
</style>
