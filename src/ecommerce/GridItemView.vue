<template>
<div>
    <div class="vx-row">
	<div class="vx-col w-full sm:w-1/2 lg:w-1/3 mb-base">
		<vx-card class="overflow-hidden">
			<div slot="no-body">
		<template>
			<img src="/img/laravel.png" alt="">
		</template>
		<div class="item-details px-4">

    <!-- RATING & PRICE -->
    <div class="flex justify-between items-center">
	<div class="text-warning border border-solid border-warning flex py-1 px-2 rounded">
		<span class="text-sm mr-1">5</span>
		<feather-icon icon="StarIcon" svgClasses="h-4 w-4" />
	</div>
	<h6 class="font-bold">$85</h6>
    </div>

		<div margin="auto" class="my-4">
           <h5 class="truncate font-semibold mb-1 hover:text-primary cursor-pointer" >Trial NameText</h5>
         <p class="item-description truncate text-sm">Trial Description</p>
      </div>
	</div>
	</div>
	</vx-card>
</div>
<div class="vx-col w-full sm:w-1/2 lg:w-1/3 mb-base">
		<vx-card class="overflow-hidden">
			<div slot="no-body">
		<template>
			<img src="/img/laravel.png" alt="">
		</template>
		</div>
	</vx-card> 
</div>
</div>
</div>
</template>
<script>
</script>