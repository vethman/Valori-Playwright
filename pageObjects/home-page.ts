import { Locator, Page } from "@playwright/test";
import { ProductComponent } from "./componentObjects/product-component";

export class HomePage {
    private readonly PRODUCTS_POPULAR: string = 'POPULAR PRODUCTS';
    private readonly PRODUCTS_ON_SALE: string = 'ON SALE';
    private readonly PRODUCTS_NEW: string = 'NEW PRODUCTS';

    private readonly _page: Page;
    private readonly _productsPopular: ProductComponent;
    private readonly _productsOnSale: ProductComponent;
    private readonly _productsNew: ProductComponent;

    constructor(page: Page) {
        this._page = page;
        this._productsPopular = new ProductComponent(this.getProductSectionLocator(this.PRODUCTS_POPULAR));
        this._productsOnSale = new ProductComponent(this.getProductSectionLocator(this.PRODUCTS_ON_SALE));
        this._productsNew = new ProductComponent(this.getProductSectionLocator(this.PRODUCTS_NEW));
    }

    public get productsPopular() : ProductComponent {
        return this._productsPopular;
    }

    public get productsOnSale() : ProductComponent {
        return this._productsOnSale;
    }

    public get productsNew() : ProductComponent {
        return this._productsNew;
    }

    async navigateTo() {
        await this._page.goto('');
    }

    async clickAllProductsLink() {
        await this.getProductSectionLocator(this.PRODUCTS_POPULAR).click();
    }

    async clickAllSaleProductsLink() {
        await this.getProductSectionLocator(this.PRODUCTS_ON_SALE).click();
    }

    async clickAllNewProductsLink() {
        await this.getProductSectionLocator(this.PRODUCTS_NEW).click();
    }

    private getProductSectionLocator(name: string): Locator {
        return this._page.locator('.featured-products')
            .filter({ has: this._page.locator('h2')
                .filter({ hasText: name }) });
        // SAME AS ABOVE, BUT DIFFERENT STYLE
        // return this._page.locator('.featured-products', { has: this._page.locator('h2', { hasText: name }) });
    }
}