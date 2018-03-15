export class Movie {
    constructor(
        public title: string,
        public actors: string,
        public director: string,
        public length: number,
        public genre: string,
        public description: string,
        public country: string,
        public year: number,
        public ratings: number[],
        public reviews: {}[],
        public pictureUrl: string
    ){}
}
// also add ratings, reviews array, picture, actors