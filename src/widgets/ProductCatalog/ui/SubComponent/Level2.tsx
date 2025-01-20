import { Link } from "@/i18n/routing";
import { useGetCityParams } from "@/shared/hooks/useGetCityParams";
import { Flex, Pagination, PaginationProps } from "antd";

interface ILevel2Props {
  readonly pageSize: number;
  readonly total: number;
  readonly current: number;
  readonly onChange: (page: number) => void;
}


// Второй уровень карты (пагинация)
const Level2: React.FC<ILevel2Props> = (props) => {
  const city = useGetCityParams()
  const { total, current, onChange, pageSize } = props;

  const onChangePage = (page: number) => {
    onChange(page);
  };

  const ItemRender: PaginationProps["itemRender"] = (page: number, type: 'page' | 'prev' | 'next' | 'jump-prev' | 'jump-next', element: React.ReactNode) => {
    if (type === 'page') {
      return <Link href={`/city/${city}/main?page=${page}`}>{page}</Link>;
    } else {
      return element;
    }
  };

    return (
      <Flex justify="center" align="center" style={{ width: "100%" }}>
        <Pagination
          align="center"
          pageSize={pageSize}
          total={total}
          current={current}
          defaultPageSize={pageSize}
          defaultCurrent={1}
          responsive={true}
          showSizeChanger={false}
          onChange={onChangePage}
        itemRender={ItemRender}
        />
      </Flex>
    );
  };

  export default Level2;
