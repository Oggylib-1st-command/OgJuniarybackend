# Generated by Django 4.2 on 2023-07-18 14:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_reviews_value_alter_user_bookid_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='user',
            options={'verbose_name': 'Пользователь', 'verbose_name_plural': 'Пользователи'},
        ),
        migrations.AddField(
            model_name='user',
            name='image',
            field=models.URLField(blank=True, default=''),
        ),
        migrations.AlterField(
            model_name='user',
            name='name',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AlterField(
            model_name='user',
            name='surname',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
    ]
