<template>
    <v-fab-transition>
        <v-hover
                v-slot:default="{ hover }"
                close-delay="200"
        >
            <v-btn rounded color="purple" dark @click="$emit('choose')" class="fontTitle" :elevation="hover ? 16 :2"
                   :loading="loading"
            >{{$t("chooseAll")}} [ - ]
                <v-icon dark right>done</v-icon>
            </v-btn>
        </v-hover>
    </v-fab-transition>
</template>
<script>
    export default {
        name: "ChooseButton",
        props: ["loading"]
    }
</script>
