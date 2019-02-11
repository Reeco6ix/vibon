<?php

namespace App\Music;

use App\Music\InterfaceAPI;

class Tracks
{
    protected $api;

    public function __construct(InterfaceAPI $interfaceAPI)
    {
        $this->api = $interfaceAPI;
    }  

    public function load($tracks) 
    {
        $apiTracks = [];
        foreach ($tracks as $track) {
            $apiTrack = $this->api->getTrack($track->api_id);
            $apiTracks[] = $apiTrack;
        }
        return $this->check($apiTracks);
    }

    public function check($apiTracks) 
    {
        foreach ($apiTracks as $apiTrack) {
            $user = auth()->user()->load('vibes.tracks');
            $apiTrack->vibes = array();

            foreach ($user['vibes'] as $userVibe) {
                foreach ($userVibe->tracks as $userVibeTrack) {
                    if($apiTrack->id == $userVibeTrack->api_id) {
                        $apiTrack->vibes[] = $userVibe->id;
                        $apiTrack->vibon_id = $userVibeTrack->id;
                    }
                }
            }
        }
        return $apiTracks;
    }
}