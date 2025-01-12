<script>
import confirmationModal from "./ConfirmationModal.js";
import ticketForm from "./TicketForm.js"; // Eeldame, et sul on TicketForm komponent
import ticketDetails from "./ticket/TicketDetails.js"; // Eeldame, et sul on TicketDetails komponent

export default {
    components: {
        confirmationModal,
        ticketForm,
        ticketDetails
    },
    emits: ["ticketUpdated"],
    props: {
        ticketInModal: {}
    },
    data () {
        return {
            isEditing: false,
            modifiedTicket: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedTicket = { ...this.ticketInModal }
            this.isEditing = true
        },
        cancelEditing() {
            this.isEditing = false
        },
        async saveModifiedTicket() {
            console.log("Salvestamine: ", this.modifiedTicket)
            const rawResponse = await fetch(this.API_URL + "/tickets/" + this.modifiedTicket.TicketID, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'   
                },
                body: JSON.stringify(this.modifiedTicket)
            });
            if (!rawResponse.ok) {
                const errorMessage = await rawResponse.json();
                alert(`Viga: ${errorMessage.message}`); // Kuvab veateate
            } else {
                console.log(rawResponse);
                this.$emit("ticketUpdated", this.modifiedTicket);
                this.isEditing = false;
            }
        },
        deleteTicket() {
            console.log("KUSTUTAMINE kinnitatud");
            // Siin saad lisada koodi pileti kustutamiseks
        }
    }
}
</script>

<template>
    <div id="ticketInfoModal" class="modal" tabindex="-1">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title">Pileti info</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <ticket-form 
                    v-if="isEditing" 
                    v-model:id="modifiedTicket.id" 
                    v-model:TicketName="modifiedTicket.TicketName" 
                    v-model:EventDate="modifiedTicket.EventDate" 
                    v-model:Price="modifiedTicket.Price">
                    </ticket-form>
                    <ticket-details v-else :ticketInModal="ticketInModal">
                    </ticket-details>
                </div>
                <div class="modal-footer">
                    <div class="container">
                        <div class="row">
                            <template v-if="isEditing">
                                <div class="col me-auto">
                                    <button type="button" 
                                    class="btn btn-danger" 
                                    data-bs-target="#confirmationModal" 
                                    data-bs-toggle="modal">
                                    Kustuta
                                    </button>
                                </div>
                                <div class="col-auto">
                                    <button type="button" 
                                    class="btn btn-success mx-2"
                                    @click="saveModifiedTicket"
                                    >Salvesta
                                    </button>
                                    <button type="button" 
                                    class="btn btn-success mx-2"
                                    @click="cancelEditing"
                                    >Tühista
                                    </button>
                                </div>
                            </template>
                            <template v-else>
                                <div class="col me-auto"></div>
                                <div class="col-auto">
                                    <button type="button" 
                                    class="btn btn-warning mx-2"
                                    @click="startEditing"
                                    >Muuda
                                    </button>
                                    <button type="button" 
                                    class="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                    >Sulge ❌
                                    </button>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>    
            </div>
        </div>
    </div>
    <confirmation-modal :target="'#ticketInfoModal'" @confirmed="deleteTicket"></confirmation-modal>
</template>