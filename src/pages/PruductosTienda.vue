<template>
  <q-page class="q-pa-md">
    <div class="row q-col-gutter-md">
      <!-- Iterar sobre los productos para crear tarjetas -->
      <div v-for="product in products" :key="product.id" class="col-12 col-sm-6 col-md-4 col-lg-3">
        <q-card class="q-pa-md">
          <q-img :src="product.image" :alt="product.name" ratio="4/3" />
          <q-card-section>
            <div class="text-h6">{{ product.name }}</div>
            <div class="text-caption text-grey">{{ product.category }}</div>
            <div class="text-subtitle1 text-bold">${{ product.price.toFixed(2) }}</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat label="Ver más" color="primary" @click="viewProduct(product)" />
            <q-btn flat label="Añadir al carrito" color="secondary" @click="addToCart(product)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts" setup>
import type { Producto } from 'src/components/models'
import type { PropType } from 'vue'

// Definimos los productos como una prop
defineProps({
  products: {
    type: Array as PropType<Array<Producto>>,
    required: true,
  },
})

// Métodos para acciones
function viewProduct(product: Producto) {
  console.log('Ver detalles del producto:', product)
}

function addToCart(product: Producto) {
  console.log('Añadir al carrito:', product)
}
</script>

<style scoped>
.q-page {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.q-card {
  width: 100%;
}

@media (min-width: 600px) {
  .q-card {
    max-width: 100%;
  }
}

.text-bold {
  font-weight: bold;
}
</style>
