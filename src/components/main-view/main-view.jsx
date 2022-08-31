import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: 'Star Wars',
          Description: 'Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire\'s world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.',
          Genre: 'Sci-Fi',
          Director: 'George Lucas',
          ImagePath: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Star_wars2.svg/1920px-Star_wars2.svg.png',
          Featured: false,
          Year: 1977
        },

        {
          _id: 2,
          Title: 'Warrior',
          Description: 'The youngest son of an alcoholic former boxer returns home, where he\'s trained by his father for competition in a mixed martial arts tournament - a path that puts the fighter on a collision course with his estranged, older brother.',
          Genre: 'Action',
          Director: 'Gavin O\'Connor',
          ImagePath: 'https://upload.wikimedia.org/wikipedia/en/e/e3/Warrior_Poster.jpg',
          Featured: false,
          Year: 2011
        },

        {
          _id: 3,
          Title: 'Tropic Thunder',
          Description: 'Through a series of freak occurrences, a group of actors shooting a big-budget war movie are forced to become the soldiers they are portraying.',
          Genre: 'Comedy',
          Director: 'Ben Stiller',
          ImagePath: 'https://upload.wikimedia.org/wikipedia/en/d/d6/Tropic_thunder_ver3.jpg',
          Featured: false,
          Year: 2008
        },

        {
          _id: 4,
          Title: 'Hercules',
          Description: 'The son of Zeus and Hera is stripped of his immortality as an infant and must become a true hero in order to reclaim it.',
          Genre: 'Comedy',
          Director: 'John Musker',
          ImagePath: 'https://upload.wikimedia.org/wikipedia/en/6/65/Hercules_%281997_film%29_poster.jpg',
          Featured: false,
          Year: 1997
        },

        {
          _id: 5,
          Title: '300',
          Description: 'King Leonidas of Sparta and a force of 300 men fight the Persians at Thermopylae in 480 B.C.',
          Genre: 'Action',
          Director: 'Zack Snyder',
          ImagePath: 'https://upload.wikimedia.org/wikipedia/en/5/5c/300poster.jpg',
          Featured: false,
          Year: 2007
        },

        {
          _id: 6,
          Title: 'The Wolf of Wall Street',
          Description: 'Based on the true story of Jordan Belfort, from his rise to a wealthy stock-broker living the high life to his fall involving crime, corruption and the federal government.',
          Genre: 'Drama',
          Director: 'Martin Scorsese',
          ImagePath: 'https://upload.wikimedia.org/wikipedia/en/d/d8/The_Wolf_of_Wall_Street_%282013%29.png',
          Featured: false,
          Year: 2013
        },

        {
          _id: 7,
          Title: 'Talladega Nights',
          Description: 'Number one NASCAR driver Ricky Bobby stays atop the heap thanks to a pact with his best friend and teammate, Cal Naughton, Jr. But when a French Formula One driver, makes his way up the ladder, Ricky Bobby\'s talent and devotion are put to the test.',
          Genre: 'Comedy',
          Director: 'Adam McKay',
          ImagePath: 'https://upload.wikimedia.org/wikipedia/en/e/e7/Talladega_nights.jpg',
          Featured: false,
          Year: 2006

        },


        {
          _id: 8,
          Title: 'The Patriot',
          Description: 'Peaceful farmer Benjamin Martin is driven to lead the Colonial Militia during the American Revolution when a sadistic British officer murders his son.',
          Genre: 'Action',
          Director: 'Roland Emmerich',
          ImagePath: 'https://upload.wikimedia.org/wikipedia/en/6/68/Patriot_promo_poster.jpg',
          Featured: false,
          Year: 2000
        },

        {
          _id: 9,
          Title: 'V For Vendetta',
          Description: 'In a future British dystopian society, a shadowy freedom fighter, known only by the alias of "V", plots to overthrow the tyrannical government - with the help of a young woman.',
          Genre: 'Action',
          Director: 'James McTeigue',
          ImagePath: 'https://upload.wikimedia.org/wikipedia/en/9/9f/Vforvendettamov.jpg',
          Featured: false,
          Year: 2006
        },

        {
          _id: 10,
          Title: 'The Punisher',
          Description: 'An undercover FBI agent becomes a vigilante and sets out to unleash his wrath upon the corrupt businessman who slaughtered his entire family at a reunion.',
          Genre: 'Action',
          Director: 'Jonathan Hensleigh',
          ImagePath: 'https://upload.wikimedia.org/wikipedia/en/d/d9/Punisher_ver2.jpg',
          Featured: false,
          Year: 2004
        },

        {
          _id: 11,
          Title: 'The Departed',
          Description: 'An undercover cop and a mole in the police attempt to identify each other while infiltrating an Irish gang in South Boston.',
          Genre: 'Drama',
          Director: 'Martin Scorsese',
          ImagePath: 'https://upload.wikimedia.org/wikipedia/en/5/50/Departed234.jpg',
          Featured: false,
          Year: 2006
        }
      ],
      selectedMovie: null
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    // if (selectedMovie) return <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />;

    if (movies.length === 0) return <div className='main-view'>The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
          ))
        }
      </div>
    );
  }
}

export default MainView;