import React from "react";
import { Link } from "react-router-dom";

const NavLinks = () => {
  return (
    <nav className="nav-bar">
      <ul>
        <li>
          <Link>New & Features</Link>
          <div className="custom-nav-link">New & Features</div>
        </li>
        <li>
          <Link>Men</Link>
          <div className="custom-nav-link">
            <ul>
              <li>
                <span>Topwear</span>
                <ul>
                  <li>T-Shirts</li>
                  <li>Casual Shirts</li>
                  <li>Formal Shirts</li>
                  <li>Jackets</li>
                </ul>
              </li>
              <li>
                <span>Bottomwear</span>
                <ul>
                  <li>Jeans</li>
                  <li>Casual Trousers</li>
                  <li>Formal Trousers</li>
                  <li>Shorts</li>
                </ul>
              </li>
              <li>
                <span>Footwear</span>
                <ul>
                  <li>Casual Shoes</li>
                  <li>Sports Shoes</li>
                  <li>Formal Shoes</li>
                  <li>Sneakers</li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <Link>Women</Link>
          <div className="custom-nav-link">
            <ul>
              <li>
                <span>Indian Wear</span>
                <ul>
                  <li>Kurtas & Suits</li>
                  <li>Sarees</li>
                  <li>Ethnic Wear</li>
                </ul>
              </li>
              <li>
                <span>Western Wear</span>
                <ul>
                  <li>Dresses</li>
                  <li>Tops</li>
                  <li>T-shirts</li>
                  <li>Jeans</li>
                  <li>Trousers</li>
                </ul>
              </li>
              <li>
                <span>Footwear</span>
                <ul>
                  <li>Flats</li>
                  <li>Casual Shoes</li>
                  <li>Heels</li>
                  <li>Boots</li>
                  <li>Sports Shoes</li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <Link>Kids</Link>
          <div className="custom-nav-link">
            <ul>
              <li>
                <span>Boys Clothing</span>
                <ul>
                  <li>T-shirts</li>
                  <li>Shirts</li>
                  <li>Shorts</li>
                  <li>Jeans</li>
                  <li>Trousers</li>
                </ul>
              </li>
              <li>
                <span>Girls Clothing</span>
                <ul>
                  <li>Dresses</li>
                  <li>Tops</li>
                  <li>T-shirts</li>
                  <li>Party wear</li>
                  <li>Jeans</li>
                </ul>
              </li>
              <li>
                <span>Footwear</span>
                <ul>
                  <li>Casual Shoes</li>
                  <li>Flipflops</li>
                  <li>Sports Shoes</li>
                  <li>Flats</li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
        <li>
          <Link>Sale</Link>
          <div className="custom-nav-link">
            <ul>
              <li>
                <span>Men's Sale</span>
                <ul>
                  <li>Shoes</li>
                  <li>Clothing</li>
                </ul>
              </li>
              <li>
                <span>Women's Sale</span>
                <ul>
                  <li>Shoes</li>
                  <li>Clothing</li>
                </ul>
              </li>
              <li>
                <span>Kid's Sale</span>
                <ul>
                  <li>Shoes</li>
                  <li>Clothing</li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default NavLinks;
