<template>
    <v-fab-transition>
        <v-hover
                v-slot:default="{ hover }"
                close-delay="200"
        >
            <v-btn rounded color="danger" dark @click="$emit('saveForm'),$emit('clickStep')" class="fontTitle" :elevation="hover ? 16 :2"
            >{{$t("reject")}}
                <v-icon dark right>remove_circle</v-icon>
            </v-btn>
        </v-hover>
    </v-fab-transition>
</template>

<script>
    export default {
        name: "Reject",
    }
</script>
