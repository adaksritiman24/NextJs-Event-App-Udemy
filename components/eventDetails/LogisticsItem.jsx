import classes from './LogisticsItem.module.css';

function LogisticsItem(props) {

  return (
    <li className={classes.item}>
      <span className={classes.icon}>
      </span>
      <span className={classes.content}>{props.children}</span>
    </li>
  );
}

export default LogisticsItem;
