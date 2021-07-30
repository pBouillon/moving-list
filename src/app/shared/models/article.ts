export const FALLBACK_IMAGE = 'box.jpg';

/**
 * Define an article to be sold / given
 */
export class Article {

    /**
     * The article's full description
     */
    public readonly description: string;

    /**
     * Whether or not the article is still available
     */
    public readonly isAvailable: boolean;

    /**
     * The article's name
     */
    public readonly name: string;

    /**
     * The article's price
     */
    public readonly price: number;

    /**
     * The path of the image, relative to `/assets`
     */
    public readonly imagePath: string;

    /**
     * Create a new article
     * @param name The article's name
     * @param description The article's full description
     * @param price The article's price, 0 will be considered as 'free'
     * @param isAvailable Whether or not the article is still available,
     *                    false by default
     * @param imagePath The path of the image, relative to `/assets`
     */
    constructor(name: string, description: string, price: number,
            isAvailable: boolean = false, imagePath: string = FALLBACK_IMAGE ) {
        this.description = description;
        this.isAvailable = isAvailable;
        this.name = name;
        this.price = price;
        this.imagePath = imagePath;
    }

}
