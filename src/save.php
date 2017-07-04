<?php
$dir=realpath('./');
$file=$dir.DIRECTORY_SEPARATOR.'data.json';

$method=strtolower($_SERVER['REQUEST_METHOD']);

$str=is_file($file)?file_get_contents($file):'';
$json=json_decode($str,true);
!$json?$json=[]:'';

$result=['code'=>0,'msg'=>''];

if($method==='post')
{
    try
    {
        foreach ($_POST as $k=>$v)
        {
            $_POST[$k]=trim(strip_tags($v));
        }

        $name=isset($_POST['name'])?$_POST['name']:'';
        $phone=isset($_POST['phone'])?$_POST['phone']:'';
        $company=isset($_POST['company'])?$_POST['company']:'';
        $memo=isset($_POST['memo'])?$_POST['memo']:'';

        array_unshift($json,['name'=>$name,'phone'=>$phone,'company'=>$company,'memo'=>$memo,'time'=>time()]);

        file_put_contents($file,json_encode($json));
    }catch (Exception $e)
    {
        $result['code']=1;
    }
    echo "<script>alert('提交成功');window.location.href = '/';</script>";die;
    echo json_encode($result);
}else{
    $check=(isset($_GET['view']) && $_GET['view'])?$_GET['view']:false;
    if (!$check)die('Method is invalid');
    echo '<style>td{width:150px;height:30px;line-height: 30px}</style>';
    echo '<table>';
    echo '<tr><td>时间</td><td>姓名</td><td>公司</td><td>备注</td><td>电话</td></tr>';
    foreach ($json as $item) {
        echo '<tr>';
        echo '<td>'.date('Y-m-d H:i',$item['time']).'</td>'.'<td>'.$item['name'].'</td>'.'<td>'.($item['company']).'</td>'.'<td>'.$item['memo'].'</td>'.'<td>'.$item['phone'].'</td>';
        echo '</tr>';
    }
    echo '</table>';
}

