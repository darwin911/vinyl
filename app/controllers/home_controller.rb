class HomeController < ApplicationController
  def index
    @spotifyAuth = RSpotify.authenticate("653c107c79104762b26adf1de5424f6e", "51797810827e4448bbabe988c66c033b")
    @track = RSpotify::Track.find('48UPSzbZjgc449aqz8bxox')
    render json: {track: @track.id, data: @track}
  end
end
