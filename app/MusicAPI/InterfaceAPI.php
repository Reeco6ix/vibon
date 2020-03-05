<?php 

namespace App\MusicAPI;

interface InterfaceAPI
{
    function authorise();
    function setUserAccessToken($accessToken);
    function refreshUserAccessToken($accessToken);
    function getUser();
    function getUserDevices();
    function search($name);

    function createPlaylist($name, $description);
    function updatePlaylist($id, $name, $description);
    function getPlaylist($id);
    function deletePlaylist($id);
    function addTracksToPlaylist($playlistId, $tracksId);
    function deleteTrackFromPlaylist($playlistId, $trackId);
    function replaceTracksOnPlaylist($playlistId, $tracksId);
    function reorderPlaylistTracks($playlistId, $rangeStart, $insertBefore);

    function getTrack($id);
    function getTracks($ids);
    function getUserTopTracks();
    function getUserRecentTracks();
    function getArtist($id);
    function getTrackRecommendations($options);

    function getPlaybackCurrentTrack();
}