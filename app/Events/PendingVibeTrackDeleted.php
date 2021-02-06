<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class PendingVibeTrackDeleted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $pendingVibeTrack;

    /**
     * Create a new event instance.
     *
     * @param $pendingVibeTrack
     * @return void
     */
    public function __construct($pendingVibeTrack)
    {
        $this->pendingVibeTrack = $pendingVibeTrack;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new Channel('pending_vibe_track.deleted');
    }

    public function broadcastWith()
    {
        return [
            'vibe' => $this->pendingVibeTrack->vibe->id,
            'message' => ''
        ];
    }
}
