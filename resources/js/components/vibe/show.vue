<template>
    <div>
        <div v-if="this.vibesAreLoaded">
            <div v-if="this.vibeIsDeleted">
                <p v-text="this.vibeDeletedMessage"></p>
            </div>

            <div v-else-if="this.vibeIsReadyToShow">

                <div v-if="this.vibeHasMessageToShow">
                    <p v-text="this.vibes.message"></p>
                    <br>
                </div>

                <attributes></attributes>

                <owner-buttons></owner-buttons>

                <join-requests></join-requests>

                <member-buttons></member-buttons>

                <user-notifications></user-notifications>

                <members></members>

                <tracks-requests :key="this.vibes.show.id"></tracks-requests>

                <tracks></tracks>
            </div>

            <div v-else>
                <p v-text="this.vibeNotFoundText"></p>
            </div>
        </div>

        <div v-else>
            <p>loading..</p>
        </div>
    </div>
</template>

<script>
    import vibes from '../../core/vibes.js';
    import user from '../../core/user.js';
    import notifications from '../user/notifications.vue';
    import memberButtons from './partials/show/member-buttons';
    import members from './partials/show/members';
    import joinRequests from './partials/show/join-requests';
    import tracksRequests from './partials/show/tracks-requests';
    import ownerButtons from './partials/show/owner-buttons';
    import attributes from './partials/show/attributes';
    import tracks from './partials/show/tracks';

    export default {
        components: {
            'user-notifications': notifications,
            'member-buttons': memberButtons,
            'members': members,
            'join-requests': joinRequests,
            'tracks-requests': tracksRequests,
            'owner-buttons': ownerButtons,
            'attributes': attributes,
            'tracks': tracks
        },

        data() {
            return {
                id: parseInt(this.$route.params.id),
                vibes: vibes,
                user: user,
            }
        },

        created() {
            this.vibes.showID = parseInt(this.id);

            if (this.vibesAreLoaded) {
                this.vibes.updateShowData();
            }
        },

        computed: {
            vibesAreLoaded() {
                return ! this.vibes.loading;
            },

            vibeIsDeleted() {
                return vibes.deleted.find(vibe => vibe.id === this.id) !== undefined;
            },

            vibeIsReadyToShow() {
                let vibe = vibes.all.find(vibe => vibe.id === this.id);

                return vibe !== undefined && Object.keys(vibes.show).length > 0;
            },

            vibeHasMessageToShow() {
                return this.vibes.message !== '';
            },

            vibeDeletedMessage() {
                let vibe = vibes.deleted.find(vibe => vibe.id === this.id);
                return vibe.name + ' has been deleted.';
            },

            vibeNotFoundText() {
                return 'Sorry, there is no vibe with ID of ' + this.id + '.';
            }
        }
    }
</script>

<style scoped>
    .active {
        background: green;
    }
</style>