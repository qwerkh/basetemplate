<template>
    <v-fab-transition>
        <v-hover
                v-slot:default="{ hover }"
                close-delay="200"
        >
            <v-btn rounded color="blue" dark @click="$emit('receive')" class="fontTitle" :elevation="hover ? 16 :2"
                   :loading="loading"
            >{{$t("receiveAndPrint")}}
                <v-icon dark right>mdi-printer</v-icon>
            </v-btn>
        </v-hover>
    </v-fab-transition>
</template>
<script>
    export default {
        name: "ReceivePrintButton",
        props: ["loading"]
    }
</script>
