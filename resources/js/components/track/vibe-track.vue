<template>
    <div :class="isPlaying">
        <play :track="track" :type="category"></play>

        <div v-if="vibes.show.currentUserIsAMember" class="vibe-track">
            <div v-for="userVibeID in user.myVibesIDs">
                <div class="vibe-name">
                    <p v-text="vibes.getVibeName(userVibeID)"></p>
                </div>

                <div class="track-buttons">
                    <cancel-pending-detach-track-button
                        v-if="track.pending_vibes_to_detach.includes(userVibeID)"
                        :vibeID="userVibeID"
                        :trackID="track.vibon_id"
                    >
                    </cancel-pending-detach-track-button>

                    <remove-button
                        v-else-if="track.vibes.includes(userVibeID)"
                        :vibeID="userVibeID"
                        :trackID="track.vibon_id"
                    >
                    </remove-button>

                    <cancel-pending-attach-track-button
                        v-else-if="track.pending_vibes_to_attach.includes(userVibeID)"
                        :vibeID="userVibeID"
                        :trackID="track.vibon_id"
                    >
                    </cancel-pending-attach-track-button>

                    <add-button
                        v-else
                        :vibeID="userVibeID"
                        :trackApiId="track.id"
                        :category="category"
                    >
                    </add-button>
                </div>
            </div>
            
            <div v-for="userVibeID in user.memberOfVibesIDs">
                <div class="vibe-name">
                    <p v-text="vibes.getVibeName(userVibeID)"></p>
                </div>

                <div class="track-buttons">
                    <cancel-pending-detach-track-button
                        v-if="track.pending_vibes_to_detach.includes(userVibeID)"
                        :vibeID="userVibeID"
                        :trackID="track.vibon_id"
                    >
                    </cancel-pending-detach-track-button>

                    <remove-button
                        v-else-if="track.vibes.includes(userVibeID)"
                        :vibeID="userVibeID"
                        :trackID="track.vibon_id"
                    >
                    </remove-button>

                    <cancel-pending-attach-track-button
                        v-else-if="track.pending_vibes_to_attach.includes(userVibeID)"
                        :vibeID="userVibeID"
                        :trackID="track.vibon_id"
                    >
                    </cancel-pending-attach-track-button>

                    <add-button
                        v-else
                        :vibeID="userVibeID"
                        :trackApiId="track.id"
                        :category="category"
                    >
                    </add-button>
                </div>
            </div>
        </div>

        <div v-if="!vibes.show.auto_dj && vibes.show.currentUserIsAMember">
            <downvote-button  :vibe="vibes.show" :track="track" v-if="track.is_voted_by_user"></downvote-button>
            <upvote-button :vibe="vibes.show" :track="track" v-else></upvote-button>
        </div>
    </div>
</template>

<script>
    import user from '../../core/user.js';
    import vibes from '../../core/vibes.js';
    import play from './vibe/partials/play';
    import addButton from './vibe/buttons/add';
    import removeButton from './vibe/buttons/remove';
    import upvoteButton from './vibe/buttons/upvote';
    import downvoteButton from './vibe/buttons/downvote';
    import cancelPendingAttachTrackButton from './vibe/buttons/cancel-pending-attach-track';
    import cancelPendingDetachTrackButton from './vibe/buttons/cancel-pending-detach-track';

    export default {
        props: ['track', 'category'],

        components: {
            'play' : play,
            'add-button': addButton,
            'remove-button': removeButton,
            'upvote-button': upvoteButton,
            'downvote-button': downvoteButton,
            'cancel-pending-attach-track-button': cancelPendingAttachTrackButton,
            'cancel-pending-detach-track-button': cancelPendingDetachTrackButton,
        },

        data() {
            return {
                user: user,
                vibes: vibes
            }
        },

        computed : {
            isPlaying() {
                if(this.vibes.playingTracks[vibes.show.id] === this.track.id && this.vibes.playingType[vibes.show.id] === this.category) {
                    return 'playback-play-track playing';
                }

                return 'playback-play-track';
            }
        }
    }
</script>

<style scoped>
    .playing {
        background: green;
    }

    .vibe-track {
        overflow: auto;
    }

    .vibe-name {
        float: left;
        width: 30%;
        margin-top: 3px;
    }

    .track-buttons {
        float: left;
        width: 70%;
    }

    .track-buttons div {
        float: right;
    }
</style>