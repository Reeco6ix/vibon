<?php

namespace App\Music\Fake;

use App\Vibe;
use App\Music\Spotify\WebAPI as spotifyWebAPI;
use Illuminate\Support\Facades\Session;

class WebAPI extends spotifyWebAPI
{
    public function search($name)
    {
        return [
            $this->getTrack('1'),
            $this->getTrack('2'),
            $this->getTrack('3'),
            $this->getTrack('4')
        ];
    }

    public function createPlaylist($name)
    {
        return (object) [
            'id' => '12am4HWXKjuSTWeMBDnwac',
        	'name' => $name
        ];         
    }

    public function updatePlaylist($id, $name) 
    {
        return (object) [
            'id' => $id,
            'name' => $name
        ];     
    }

    public function getPlaylist($id) 
    {
        return (object) [
            'id' => $id,
            'name' => 'Reggae Reggae Sound',
        ];  
    }

    public function deletePlaylist($id)
    {
        return (object) [];  
    }

    public function addTracksToPlaylist($playlistId, $tracksId)
    {
        return (object) [
        	'id' => $playlistId,
            'tracks' => $tracksId
        ];     
    }

    public function replaceTracksOnPlaylist($playlistId, $tracksId) 
    {
        return (object) [
            'id' => $playlistId,
            'tracks' => $tracksId
        ];   
    }

    public function getTrack($id)
    {
        return (object) [
            'id' => $id,
            'name' => 'Zion Train',
            'album' => (object) [
                'id' => '823n23923n3',
                'name' => 'Ghetto Youths',
                'images' => [
                    (object) [
                        'url' => 'ghettoyouth00.png'
                    ],
                    (object) [
                        'url' => 'ghettoyouth01.png'
                    ]
                ]
            ],
            'artists' => (object) [
                $this->getArtist('1'),
                $this->getArtist('2'),
                $this->getArtist('3'),
                $this->getArtist('4')
            ],
        ];  
    }

    public function getArtist($id) 
    {
        return (object) [
            'id' => $id,
            'genres' => array('roots', 'reggae')
        ];
    }
}
