<?php

namespace App\MusicAPI;

class Tracks
{
    protected $api;

    public function __construct(InterfaceAPI $interfaceAPI)
    {
        $this->api = $interfaceAPI;
    }

    public function loadFor($vibe)
    {
        $tracks = $vibe->showTracks;
        $trackCollection = collect([]);
        collect($tracks)->each(function ($track) use($trackCollection, $vibe) {
            $loadedTrack = $this->api->getTrack($track->api_id);
            $loadedTrack->votes_count = $track->votesCountOn($vibe);
            $loadedTrack->is_voted_by_user = $track->isVotedByAuthUserOn($vibe);
            $trackCollection[] = $loadedTrack;
        });
        return $trackCollection;
    }

    public function load($tracks)
    {
        $trackCollection = collect([]);
        collect($tracks)->each(function ($track) use($trackCollection) {
            $loadedTrack = $this->api->getTrack($track->api_id);
            $trackCollection[] = $loadedTrack;
        });
        return $trackCollection;
    }

    public function check($apiTracks) 
    {
        $user = auth()->user()->load('vibes.tracks');
        foreach ($apiTracks as $apiTrack) {
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

    public function getRecommendations($options)
    {
        return $this->api->getTrackRecommendations($options);
    }
}
