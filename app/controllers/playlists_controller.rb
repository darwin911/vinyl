class PlaylistsController < ApplicationController
  # skip_before_filter :verify_authenticity_token
  before_action :set_playlist, only: [:show, :update, :destroy]

  # GET /playlists
  def index
    @playlists = Playlist.all
    render json: @playlists
  end

  # GET /playlists/1
  def show
    @playlist = Playlist.find(params[:id])
    render json: @playlist
  end

  #POST /playlists
  def create
    @playlist = Playlist.new(playlist_params)
    if @playlist.save!
    #  p @playlist
      render json: @playlist, status: :created, location: @playlist
    else
      render json: @playlist.errors, status: :unprocessable_entity
    end
  end

  private

  def set_playlist
    @playlist = Playlist.find(params[:id])
  end

  def playlist_params
    params.require(:playlist).permit(:name, :length, tracks: [])
  end

end
