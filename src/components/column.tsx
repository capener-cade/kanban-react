import axios from 'axios'
import { Container, Card, CardHeader, Button, Typography } from '@material-ui/core';

type ColumnCard = {
    _id: number;
    title: string;
    boardId: number;
}

//I know I shouldn't set the type to any but what do I set it as? 
interface Props {
    column: string;
    cards: ColumnCard[];
    refreshBoard(boardId: number): Promise<void>;
}

function Column(props: Props) {
    const {column, cards} = props;
    // const taskList = ['Backlog', 'ToDo', 'Doing', 'Done']
     const erase = async(id: string | number | null | undefined, boardId: number): Promise<void> =>  { 
         await axios.delete(`http://localhost:3001/api/board/${boardId}/${id}`);
         await props.refreshBoard(boardId);
      }

      const onDragStart = (e: { dataTransfer: { setData: (arg0: string, arg1: any) => void; }; }, cardTitle: React.ReactNode, cardId: string | number) => {
    	console.log('dragstart on div: ', cardTitle);
    	e.dataTransfer.setData("cardId", cardId);
	}

    return (
        <Container>
            {cards.map((card: { _id: string | number ; title: React.ReactNode; boardId: number }) => {
            return <Card style={{margin:"15px", padding:"10px 0"}} variant="outlined" key={card._id} draggable onDragStart={(e:any) => {onDragStart(e, card.title, card._id)}}> 
                    <Typography style={{ margin:"0 10px"}}>{card.title}</Typography>
                            <Button color="secondary" size="small" onClick={(event: React.MouseEvent<HTMLElement>) => {
                                erase(card._id, card.boardId)
                            }}>Delete</Button>
                    </Card>
            })}
        </Container>
    );
}

export default Column;