/* deprecated file, to be removed when .vue version of modal implementation starts working */

import confirmationModal from "./ConfirmationModal.js";
import eventForm from "./EventForm.js"; // Eeldame, et sul on EventForm komponent
import eventDetails from "./event/EventDetails.js"; // Eeldame, et sul on EventDetails komponent

export default {
    template: `
        <div id="eventInModal" class="modal" tabindex="-1">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title">Ürituse info</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <event-form 
                        v-if="isEditing" 
                        v-model:id="modifiedEvent.id" 
                        v-model:EventName="modifiedEvent.EventName" 
                        v-model:EventDate="modifiedEvent.EventDate" 
                        v-model:Location="modifiedEvent.Location" 
                        v-model:Price="modifiedEvent.Price">
                        </event-form>
                        <event-details v-else :eventInModal="eventInModal">
                        </event-details>
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
                                        @click="saveModifiedEvent"
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
        <confirmation-modal :target="'#eventInModal'" @confirmed="deleteEvent"></confirmation-modal>
    `,
    components: {
        confirmationModal,
        eventForm,
        eventDetails
    },
    emits: ["eventUpdated"],
    props: {
        eventInModal: {}
    },
    data () {
        return {
            isEditing: false,
            modifiedEvent: {}
        }
    },
    methods: {
        startEditing() {
            this.modifiedEvent = { ...this.eventInModal }
            this.isEditing = true
        },
        cancelEditing() {
            this.isEditing = false
        },
        async saveModifiedEvent() {
            console.log("Salvestamine: ", this.modifiedEvent)
            const rawResponse = await fetch(this.API_URL + "/events/" + this.modifiedEvent.event_id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'   
                },
                body: JSON.stringify(this.modifiedEvent)
            });
            if (!rawResponse.ok) {
                const errorMessage = await rawResponse.json();
                alert(`Viga: ${errorMessage.message}`); // Kuvab veateate
            } else {
                console.log(rawResponse);
                this.$emit("eventUpdated", this.modifiedEvent);
                this.isEditing = false;
            }
        },
        deleteEvent() {
            console.log("KUSTUTAMINE kinnitatud");
            // Siin saad lisada koodi ürituse kustutamiseks
        }
    }
}