<?php

namespace App\Http\Controllers;

use App\Vibe;
use App\User;

use App\Music\Playlist;
use App\Music\Tracks;
use App\Music\Spotify\WebAPI;

use App\Http\Requests\StoreVibe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VibeController extends Controller
{
    public function __construct() {
        $this->middleware('setAccessTokenForAPI');
        $this->middleware('checkAuthorisationForAPI', ['only' => ['create', 'edit', 'delete']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(WebAPI $webAPI)
    {
        return view('vibe.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreVibe $request, Playlist $playlist)
    {
        $newPlaylist = $playlist->create($request->input('name'));
        $vibe = Vibe::create([
            'api_id' => $newPlaylist->id,
            'description' => request('description'),
            'open' => request('open'),
            'auto_dj' => request('auto_dj')
        ]);
        $vibe->users()->attach(Auth()->user()->id, ['owner' => 1]);
        return redirect($vibe->path());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\vibe  $vibe
     * @return \Illuminate\Http\Response
     */
    public function show(Vibe $vibe, Playlist $playlist, Tracks $tracks)
    {
        return view('vibe.show', [
            'vibe' => $playlist->loadOne($vibe),
            'apiTracks' => $tracks->load($vibe->tracks)
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\vibe  $vibe
     * @return \Illuminate\Http\Response
     */
    public function edit(Vibe $vibe, Playlist $playlist)
    {
        $this->authorize('update', $vibe);
        return view('vibe.edit')->with('vibe', $playlist->loadOne($vibe));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\vibe  $vibe
     * @return \Illuminate\Http\Response
     */
    public function update(StoreVibe $request, Vibe $vibe, Playlist $playlist)
    {
        $this->authorize('update', $vibe);
        $vibe->update(request(['description', 'open', 'auto_dj']));
        $playlist->update($vibe->api_id, $request->input('name'));
        return redirect($vibe->path());
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\vibe  $vibe
     * @return \Illuminate\Http\Response
     */
    public function destroy(Vibe $vibe, Playlist $playlist)
    {
        $this->authorize('delete', $vibe);
        $message = $playlist->loadOne($vibe)->name . ' has been deleted.';
        $playlist->delete($vibe->api_id);
        $vibe->users()->detach(Auth::id());
        $vibe->delete();
        return redirect('/home')->with('message', $message);
    }
}
