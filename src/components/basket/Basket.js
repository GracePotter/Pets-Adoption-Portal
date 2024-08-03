// Basket
import "bootstrap/dist/css/bootstrap.min.css";
function ShowBasketComponent(props) {

  // Calcluate total price
  // function getBasketTotal(acc, obj) {
  //   return acc + obj.plant.price;
  // }
  

  return (
    <>
      <hr />
      <h3>Your Pets basket</h3>
      {/* <img alt="pets basket" src={basketPicture} /> */}
      <p>
        Your basket has <b>{props.basket.length}</b> items
      </p>
      <p>
        {/* <b>Total cost: €{props.basket.reduce(getBasketTotal, 0)}</b> */}
      </p>
      <div class="container-fluid">
        <div class="table-responsive">
          <table class="table table-hover table-bordered" border="1">
            <tr><td>ewrwer</td></tr>
          </table>
        </div></div>
      <div class="container-fluid">
        <div class="table-responsive">
          <table class="table table-hover table-bordered table-sm" border="1"><tbody>
          {props.basket.sort(props.sorting).map((p, index) => (
            <tr key={index}>
              <td>{p.id}</td><td>{p.name}</td><td>{p.category}</td>  
              {/* €{p.price.toFixed(2)}{" "} */}
              <td><button class="btn btn-warning" onClick={() => props.removePetFromBasket(p)}>Remove</button></td>
            </tr>
          ))}
          </tbody></table>
        </div>
      </div>
    </>
  );
}

export default ShowBasketComponent;